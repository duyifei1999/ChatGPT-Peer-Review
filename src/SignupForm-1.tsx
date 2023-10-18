import {
  Box,
  Grid,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText, Link,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UoMBlue } from '../../app/color';
import InputTextField from '../Form/InputTextField';
import ImageUploadV2 from '../Register/component/ImageUploadV2';
import WarningMessage from '../Login/components/WarningMessage/WarningMessage';
import SuccessMessage from '../Register/SuccessMessage/SuccessMessage';
import SingleSelectField from '../Form/SingleSelectField';
import DoubleRowCheckBox from '../Form/DoubleRowCheckBox';
import { signup } from '../../utils/studentApi';
import {
  EMAIL_EXISTS_ERROR,
  INTERNAL_SERVER_ERROR,
  USERNAME_PASSWORD_MISMATCH_ERROR,
} from '../../common/constants/ErrorMessages';
import {
  availableMatch,
  courseMatch,
  courseProgressMatch,
  learningAreaMatch,
  locationsMatch, skillMatch,
} from '../../common/FieldsMatches/studentProfileFieldsMatch';
import LoadingMessage from '../ForgottenPassword/Loading/LoadingMessage';
import TermOfUse from '../TermOfUse/TermOfUse';

const validationSchema = Yup.object({
  firstName: Yup
    .string()
    .required('First Name is required.'),
  lastName: Yup
    .string()
    .required('Last Name is required.'),
  preferredName: Yup
    .string(),
  pronouns: Yup
    .string(),
  studentNumber: Yup
    .number().typeError('Please enter a valid Student Number.')
    .required('Student Number is required'),
  email: Yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required')
    .matches(/@student\.unimelb\.edu\.au$/, 'Email must be a UoM student email'),
  course: Yup
    .string().required('Course is required field.'),
  courseProgress: Yup
    .string().required('Course Progress is required field.'),
  currentLocation: Yup
    .string().required('Current Location is required field.'),
  workWithChild: Yup
    .string().required('Please check one of the selection.'),
  skills: Yup
    .string().test('is not empty', 'Please select at least one Skill', (value) => value !== '+').required('Please select at least one Skill'),
  location: Yup
    .string().test('is not empty', 'Please select at least one Location', (value) => value !== '+').required('Please select at least one Location'),
  learningArea: Yup
    .string().test('is not empty', 'Please select at least one Learning Area', (value) => value !== '+').required('Please select at least one Learning Area'),
  available: Yup
    .string().test('is not empty', 'Please select at least one skill', (value) => value !== '+').required('Please select at least one Skill'),
  image: Yup
    .string().required('Please upload a profile image'),
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

function SignupForm() {
  const [base64Data, setbase64Data] = React.useState('');
  const navigate = useNavigate();
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

  const submitForm = useCallback(async (value: any) => {
    try {
      const jsonObj = {
        image: value.image,
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
        preferredName: value.preferredName,
        pronouns: value.pronouns,
        studentNumber: value.studentNumber,
        course: value.course,
        courseProgression: value.courseProgress,
        currentLocation: value.currentLocation,
        workWithChildren: value.workWithChild === 'Yes',
        otherSkillExperience: value.skills,
        locationOption: value.location,
        learningAreas: value.learningArea,
        available: value.available,
        isPublic: 'True',
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
          message: 'Your account is created.',
        });
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
        setWarning({
          shown: true,
          message: 'Oops! Something went wrong.',
        });
      }
    }
  }, [navigate]);
