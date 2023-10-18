import { Paper, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, Link, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import './Register.scss';
import { UoMBlue } from 'src/app/color';
import { signup } from 'src/utils/schoolsApi';
import { EMAIL_EXISTS_ERROR, INTERNAL_SERVER_ERROR, USERNAME_PASSWORD_MISMATCH_ERROR } from 'src/common/constants/ErrorMessages';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import ImageUploadV1 from './component/ImageUploadV1';
import ImageUploadV2 from './component/ImageUploadV2';
import WarningMessage from '../Login/components/WarningMessage/WarningMessage';
import SuccessMessage from './SuccessMessage/SuccessMessage';
import LoadingMessage from '../ForgottenPassword/Loading/LoadingMessage';
import TermOfUse from '../TermOfUse/TermOfUse';

interface CheckedState {
    [key: string]: boolean;
}

const checkboxes = [
    { name: 'ELC', label: 'ELC' },
    { name: 'L1', label: 'F to 6' },
    { name: 'L2', label: 'F to 9' },
    { name: 'L3', label: 'F to 12' },
    { name: 'L4', label: '7 to 12' },
    { name: 'L5', label: '7 to 9' },
    { name: 'L6', label: '10 to 12' },
];
function Register(this: any) {
    const navigate = useNavigate();
    const [base64Data, setbase64Data] = React.useState('');
    const [newchecklist, setnewchecklist] = React.useState('');
    const [checked, setChecked] = React.useState<CheckedState>({
        ELC: false,
        L1: false,
        L2: false,
        L3: false,
        L4: false,
        L5: false,
        L6: false,
    });
    const [warning, setWarning] = useState({
        shown: false,
        message: '',
    });
    const [success, setSucces] = useState({
        shown: false,
        message: '',
    });
    const [loading, setLoading] = useState({
        shown: false,
        message: '',
    });
    const validationSchema = Yup.object({
        schoolName: Yup
            .string()
            .required('School name is required.'),
        contactName: Yup
            .string()
            .required('Contact name is required.'),
        email: Yup
            .string()
            .trim()
            .email('Enter a valid email')
            .required('Email is required'),
        webAddress: Yup
            .string()
            .url('Invalid website format. Example: http://www.google.com')
            .required('Website address is required.'),
        sector: Yup
            .string()
            .required('Sector is required.'),
        yearLevel: Yup
            .string().required('Year level is required.'),
        image: Yup
            .string().required('Please upload a school image/logo.'),
        password: Yup
            .string()
            .required('Password is required')
            .min(8, 'Password should be of minimum 8 characters length'),
        checkpassword: Yup
            .string()
            .oneOf([Yup.ref('password'), ''], "Passwords don't match!")
            .required('Please repeat your password.'),
        termOfUse: Yup
            .boolean().isTrue('Please read and check the term of use.'),
    });

    const submitForm = useCallback(async (value: any) => {
        try {
            const jsonObj = {
                image: value.image,
                email: value.email,
                password: value.password,
                sector: value.sector,
                webAddress: value.webAddress,
                yearLevels: value.yearLevel,
                schoolName: value.schoolName,
                contactName: value.contactName,
            };
            setWarning({
                shown: false,
                message: '',
            });
            setLoading({
                shown: true,
                message: 'Loading ... ',
            });
            const signupResponse = await signup(
                jsonObj,
            );
            if (signupResponse.status === StatusCodes.OK) {
                localStorage.setItem('email', value.email);
                setLoading({
                    shown: false,
                    message: '',
                });
                setSucces({
                    shown: true,
                    message: 'Your account is created successfully.',
                });
                // navigate('/');
                setTimeout(() => {
                    navigate('/check-email');
                }, 3000);
            }
        } catch (error: any) {
            if (error.response) {
                setLoading({
                    shown: false,
                    message: '',
                });
                if (error.response.status >= StatusCodes.INTERNAL_SERVER_ERROR) {
                    setWarning({
                        shown: true,
                        message: INTERNAL_SERVER_ERROR,
                    });
                }
                if (error.response.status === StatusCodes.CONFLICT) {
                    setWarning({
                        shown: true,
                        message: EMAIL_EXISTS_ERROR,
                    });
                }
                if (error.response.status === StatusCodes.METHOD_NOT_ALLOWED) {
                    setWarning({
                        shown: true,
                        message: 'Your account is blocked. You cannot use this email to create account.',
                    });
                }
                if (error.response.status === StatusCodes.UNAUTHORIZED) {
                    setWarning({
                        shown: true,
                        message: USERNAME_PASSWORD_MISMATCH_ERROR,
                    });
                }
            } else {
                setLoading({
                    shown: false,
                    message: '',
                });
                setWarning({
                    shown: true,
                    message: 'Oops! Something went wrong.',
                });
            }
        }
    }, [navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            ELC: event.target.checked,
            L1: event.target.checked,
            L2: event.target.checked,
            L3: event.target.checked,
            L4: event.target.checked,
            L5: event.target.checked,
            L6: event.target.checked,
        });
    };

    const formik = useFormik({
        initialValues: {
            schoolName: '',
            contactName: '',
            email: '',
            webAddress: '',
            sector: '',
            yearLevel: '',
            image: '',
            password: '',
            checkpassword: '',
            termOfUse: false,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: submitForm,
    });

    useEffect(() => {
        const checklist = Object.keys(checked).filter((name) => checked[name]);
        formik.setFieldValue('yearLevel', checklist.join('-'));
    }, [checked]);

    const [showPassword, setShowPassword] = useState(false);
    const callBack = (childdata: string) => {
        setbase64Data(childdata);
        formik.setFieldValue('image', childdata.toString());
    };
    const prevIsSubmittingRef = React.useRef(formik.isSubmitting);
    React.useEffect(() => {
        if (prevIsSubmittingRef.current && !formik.isSubmitting && !formik.isValid) {
            const firstErrorField = Object.keys(formik.errors)[0];
            console.log(Object.keys(formik.errors));
            const fieldRef = document.getElementsByName(firstErrorField)[0];
            if (fieldRef) {
                fieldRef.scrollIntoView({ behavior: 'smooth' });
            }
            // or do other imperative stuff that DOES NOT SET STATE
            // like smooth scrolling etc.
        }
        prevIsSubmittingRef.current = formik.isSubmitting;
    }, [formik.isSubmitting, formik.errors, formik.isValid]);