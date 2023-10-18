const workWithChildHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('workWithChild', event.target.value);
};

const prevIsSubmittingRef = React.useRef(formik.isSubmitting);
const [showPassword, setShowPassword] = useState(false);
React.useEffect(() => {
    if (prevIsSubmittingRef.current && !formik.isSubmitting && !formik.isValid) {
        const firstErrorField = Object.keys(formik.errors)[0];
        const fieldRef = document.getElementsByName(firstErrorField)[0];
        if (fieldRef) {
            fieldRef.scrollIntoView({ behavior: 'smooth' });
        }
    }
    prevIsSubmittingRef.current = formik.isSubmitting;
}, [formik.isSubmitting, formik.errors, formik.isValid]);

return (
    <form noValidate className="form" onSubmit={formik.handleSubmit}>
        <div className="logobox">
            <img className="logo" src="https://d2glwx35mhbfwf.cloudfront.net/v13.4.18/logo-with-padding.svg" alt="" />
        </div>
        <h1 className="title" style={{ color: UoMBlue }}>Student Register</h1>

        <InputTextField formik={formik} inputName="firstName" label="First Name" required />
        <InputTextField formik={formik} inputName="lastName" label="Last Name" required />
        <InputTextField formik={formik} inputName="preferredName" label="Preferred Name" />
        <InputTextField formik={formik} inputName="pronouns" label="Pronouns" />
        <InputTextField formik={formik} inputName="studentNumber" label="UoM student number" required />
        <InputTextField formik={formik} inputName="email" label="UoM Email Address" required />

        <SingleSelectField required formik={formik} name="course" inputName="course" label="course" title="Course" selection={courseMatch} />
        <SingleSelectField required formik={formik} name="courseProgress" inputName="courseProgress" label="courseProgress" title="Course Progression" selection={courseProgressMatch} />
        <SingleSelectField required formik={formik} name="currentLocation" inputName="currentLocation" label="currentLocation" title="Current Location" selection={locationsMatch} />

        <Box mt={3}>
            <FormControl onChange={workWithChildHandle} error={formik.touched.workWithChild && Boolean(formik.errors.workWithChild)}>
                <FormLabel required id=" abuttons-group-label">Working With Children Check </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="workWithChild"
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </Box>

        <DoubleRowCheckBox required formik={formik} name="skills" inputName="skills" title="skills" selection={skillMatch} />
        <DoubleRowCheckBox required formik={formik} name="location" inputName="location" title="Open To Work Locations" selection={locationsMatch} />
        <DoubleRowCheckBox required formik={formik} name="learningArea" inputName="learningArea" title="Learning Area" selection={learningAreaMatch} />
        <DoubleRowCheckBox required formik={formik} name="available" inputName="available" title="Available To" selection={availableMatch} />

        <div style={{ width: '100%' }}>
            <h3>Upload Photo*</h3>
            <p>Hint: Upload a photo of yourself to personalize your student profile. </p>
            <ImageUploadV2 handelCallback={callBack} style={{ width: '100%' }} />
            <FormHelperText>{formik.touched.image && formik.errors.image}</FormHelperText>
        </div>
        <h3>Set Password*</h3>
        <InputTextField formik={formik} inputName="password" label="Password" type={showPassword ? 'text' : 'password'} />
        <InputTextField formik={formik} inputName="checkpassword" label="Repeat Password" type={showPassword ? 'text' : 'password'} />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide Password' : 'Show Password'}
        </button>
        <TermOfUse formik={formik} />
        <div style={{ textAlign: 'center' }}>
            {warning.shown ? <WarningMessage content={warning.message} /> : null}
            {success.shown ? <SuccessMessage content={success.message} /> : null}
            {loading.shown ? <LoadingMessage content={loading.message} /> : null}
            <Button
                className="button"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Signup
            </Button>
            <br />
            <Link href="/" variant="body2">
                Already have a student account? Back to Login
            </Link>
        </div>
    </form>
);
}

export default SignupForm;