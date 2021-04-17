import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {RegisterUserRequest} from '../../transport/auth';
import {register} from '../../service/auth-service';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {isUsernameValid, isPasswordValid, isEmailValid} from "./validator";

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
    },
    titleContainer: {
        height: `40px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `40px`,
    },
    inputContainer: {
        minHeight: `40px`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        backgroundColor: `rgba(250,250,250,0.98)`,
        borderRadius: `20px`,
        padding: `20px`,
        width: `30vw`,
    },
    formInput: {
        margin: `20px 0px 20px 0px`,
    },
    signUpButton: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: "capitalize",
    },
    errorPanel: {
        paddingBottom: 10 + 'px',
        textAlign: "left",
    },
    errorTitle: {
        fontWeight: "bold",
    },
    show: {
        display: `block`,
    },
    showText: {
        display: `block`,
        fontSize: `20px`,
        color: `black`,
    },
    hide: {
        display: 'none',
    }
}));

type registerDetailsType = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type registerErrorType = {
    error: boolean,
    message: string,
}

type ErrorType = {
    username: boolean,
    email: boolean,
    password: boolean,
    confirmPassword: boolean,
}

const initialRegisterDetails: registerDetailsType = {
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: ''
};

const inititalRegisterError: registerErrorType = {
    error: false,
    message: '',
}

const initialError: ErrorType = {
    username: false, 
    email: false, 
    password: false,  
    confirmPassword: false, 
}



const RegisterPage = () => {

    const classes = styles();

    const [registerDetails, setRegisterDetails] = useState<registerDetailsType>(initialRegisterDetails);
    const [registerError, setRegisterError] = useState<registerErrorType>(inititalRegisterError);
    const [error, setError] = useState<ErrorType>(initialError);
    const [registrationSucceeded, setRegistrationSucceeded] = useState<boolean>(false);

    const validateForm = () => {
        const errors: ErrorType = {
            username: !isUsernameValid(registerDetails.username),
            email: !isEmailValid(registerDetails.email),
            password: !isPasswordValid(registerDetails.password),
            confirmPassword: !isPasswordValid(registerDetails.confirmPassword) || registerDetails.password !== registerDetails.confirmPassword,
        }
        setError(errors);
        return !(
            errors.username ||
            errors.email ||
            errors.password ||
            errors.confirmPassword
        );
    };

    const handleRegistration = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            setRegisterError({
                error: true,
                message: 'One or more fields are invalid',
            });
            return;
        }

        // setLoginFailed
        const registerUserRequest = {
            username: registerDetails.username,
            email: registerDetails.email,
            password: registerDetails.password,
        }

        const registrationResponse = await register(registerUserRequest);

        console.log(registrationResponse);

        if (!registrationResponse.ok) {
            const message = await registrationResponse.text();
            setRegisterError({
                error: true,
                message: message,
            });
            return;
        }

        setRegistrationSucceeded(true);
    }

    const updateUsername = (username: string) => {
        const newRegisterDetails: registerDetailsType = {
            ...registerDetails,
            username: username,
        }
        setRegisterDetails(newRegisterDetails);
    }

    const updateEmail = (email: string) => {
        const newRegisterDetails: registerDetailsType = {
            ...registerDetails,
            email: email,
        }
        setRegisterDetails(newRegisterDetails);
    }

    const updatePassword = (password: string) => {
        const newRegisterDetails: registerDetailsType = {
            ...registerDetails,
            password: password,
        }
        setRegisterDetails(newRegisterDetails);
    }

    const updateConfirmPassword = (confirmPassword: string) => {
        const newRegisterDetails: registerDetailsType = {
            ...registerDetails,
            confirmPassword: confirmPassword,
        }
        setRegisterDetails(newRegisterDetails);
    }


    const getConfirmPasswordErrorText = () => {
        if (registerDetails.password !== registerDetails.confirmPassword) {
            return 'Passwords must match.';
        }

        return error.confirmPassword ? 'Invalid password.' : '';
    }

    const renderSignupFailedBanner = () => {
        if (registerError.error) {
            return (
                <Box className={classes.errorPanel}>
                    <Alert severity="error">
                        <AlertTitle className={classes.errorTitle}>Registration failed</AlertTitle>
                        {registerError.message}
                    </Alert>
                </Box>);
        }
    }

    const renderUsernameSection = () => {
        return (
            <React.Fragment>
                <TextField
                    className={classes.formInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateUsername(e.target.value)}
                    label="Username"
                    value={registerDetails.username}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    error={error.username}
                    helperText={error.username ? 'Invalid username.' : ''}
                />
            </React.Fragment>);
    }

    const renderEmailSection = () => {
        return (
            <React.Fragment>
                <TextField
                    className={classes.formInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEmail(e.target.value)}
                    label="Email"
                    value={registerDetails.email}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    error={error.email}
                    helperText={error.email ? 'Invalid email.' : ''}
                />
            </React.Fragment>);
    }

    const renderPasswordSection = () => {
        return (
            <React.Fragment>
                <TextField
                    className={classes.formInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePassword(e.target.value)}
                    label="Password"
                    value={registerDetails.password}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    error={error.password}
                    helperText={error.password ? 'Invalid password.' : ''}
                />
                <TextField
                    className={classes.formInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    value={registerDetails.confirmPassword}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    error={error.confirmPassword}
                    helperText={getConfirmPasswordErrorText()}
                />
            </React.Fragment>);
    }

    const renderButton = () => {
        return (<Box display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mt={2}>
            <Button className={classes.signUpButton}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                {`Continue`}
            </Button>
            </Box>
        );
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.titleContainer}>
                {`Register`}
            </h1>
            <div className={`${classes.inputContainer}`}>
                <form className={`${registrationSucceeded ? classes.hide : classes.show }`} onSubmit={(event) => handleRegistration(event)}>
                    {renderSignupFailedBanner()}
                    {renderUsernameSection()}
                    {renderEmailSection()}
                    {renderPasswordSection()}
                    {renderButton()}
                </form>
                <div className={`${registrationSucceeded ? classes.showText : classes.hide }`}>
                    {`Registration was successful, please check your emails to confirm your registration.`}
                </div>
            </div>
            
        </div>
    )
}

export default RegisterPage;