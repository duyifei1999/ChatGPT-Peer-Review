return (
    <Grid
        container
        component="main"
        sx={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: UoMBlue,
            minHeight: '100vh',
            paddingTop: '8px',
            paddingBottom: '10px',
        }}
    >
        <Grid
            item
            xs={12}
            sm={12}
            md={9}
            lg={7}
            component={Paper}
            elevation={5}
            square
            sx={{
                position: 'relative',
            }}
        >
            <div className="register-form" style={{ width: '100%' }}>
                <form noValidate className="form" onSubmit={formik.handleSubmit}>
                    <div className="logobox">
                        <img className="logo" src="https://d2glwx35mhbfwf.cloudfront.net/v13.4.18/logo-with-padding.svg" alt="" />
                    </div>
                    <h1 className="title" style={{ color: UoMBlue }}>School Register</h1>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="schoolName"
                        label="School Name"
                        name="schoolName"
                        autoComplete="schoolName"
                        autoFocus
                        value={formik.values.schoolName}
                        onChange={formik.handleChange}
                        error={formik.touched.schoolName && Boolean(formik.errors.schoolName)}
                        helperText={formik.touched.schoolName && formik.errors.schoolName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contactName"
                        label="Contact Name"
                        name="contactName"
                        autoComplete="name"
                        value={formik.values.contactName}
                        onChange={formik.handleChange}
                        error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                        helperText={formik.touched.contactName && formik.errors.contactName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Contact Email"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="webAddress"
                        label="Website Address"
                        name="webAddress"
                        autoComplete="webAddress"
                        value={formik.values.webAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.webAddress && Boolean(formik.errors.webAddress)}
                        helperText={formik.touched.webAddress && formik.errors.webAddress}
                    />
                    <FormControl
                        variant="outlined"
                        style={{ width: '100%', margin: 1 }}
                    >
                        <InputLabel id="test-select-label" required style={{ marginTop: '17px' }}>Sector</InputLabel>
                        <Select
                            id="sector"
                            name="sector"
                            label="Sector"
                            autoComplete="sector"
                            value={formik.values.sector}
                            onChange={formik.handleChange}
                            error={formik.touched.sector && Boolean(formik.errors.sector)}
                            fullWidth
                            required
                            variant="outlined"
                            style={{ marginTop: '16px' }}
                        >
                            <MenuItem value="GOV">Government</MenuItem>
                            <MenuItem value="IND">Independent</MenuItem>
                            <MenuItem value="IS">International</MenuItem>
                            <MenuItem value="CAT">Catholic</MenuItem>
                            <MenuItem value="LDC">Long Day Care</MenuItem>
                            <MenuItem value="PSK">Pre-School/Kingdergarten</MenuItem>
                            <MenuItem value="OSHC">Outside of School Hours Care</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.sector && formik.errors.sector}</FormHelperText>
                    </FormControl>
                    <h3>Year Levels*</h3>
                    <FormControlLabel
                        label="Select All"
                        name="yearLevel"
                        control={(
                            <Checkbox
                                checked={Object.values(checked).every((value) => value)}
                                onChange={handleChangeAll}
                            />
                        )}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        {checkboxes.map(({ name, label }) => (
                            <FormControlLabel
                                key={name}
                                label={label}
                                control={<Checkbox name={name} checked={checked[name]} onChange={handleChange} />}
                            />
                        ))}
                    </Box>
                    <FormHelperText>{formik.touched.yearLevel && formik.errors.yearLevel}</FormHelperText>
                    <div style={{ width: '100%' }}>
                        <h3>Upload Photo*</h3>
                        <p>Hint: School logo or a nice picture of the school </p>
                        {/* <ImageUploadV1 handelCallback={callBack} style={{ width: '100%' }} /> */}
                        <ImageUploadV2 handelCallback={callBack} style={{ width: '100%' }} />
                        <FormHelperText>{formik.touched.image && formik.errors.image}</FormHelperText>
                    </div>
                    <h3>Set Password*</h3>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="checkpassword"
                        label="Repeat Password"
                        type={showPassword ? 'text' : 'password'}
                        id="checkpassword"
                        autoComplete="current-password"
                        value={formik.values.checkpassword}
                        onChange={formik.handleChange}
                        error={formik.touched.checkpassword && Boolean(formik.errors.checkpassword)}
                        helperText={formik.touched.checkpassword && formik.errors.checkpassword}
                    />
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
                            SIGNUP
                        </Button>
                        <br />
                        <Link href="/" variant="body2">
                            Already have an account? Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </Grid>
    </Grid>
);
}

export default Register;
