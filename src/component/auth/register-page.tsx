import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RegisterUserRequest, RegisterUserTempRequest} from '../../transport/auth';
import EntryField from './entry-field';
import SubmitButton from './submit-buttion';
import {register} from '../../service/auth-service';

const styles = makeStyles(theme => ({
    titleContainer: {
        height: `60px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `40px`,
    },
    inputContainer: {
        height: `100px`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
    },
}));

const RegisterPage = () => {

    const classes = styles();

    const [registerDetails, setRegisterDetails] = useState(new RegisterUserTempRequest("", "", "", ""));

    const updateName = (name: string) => {
        const newRegisterDetails: RegisterUserTempRequest = new RegisterUserTempRequest(name, registerDetails.password, registerDetails.password2, registerDetails.email);
        setRegisterDetails(newRegisterDetails);
    }

    const updatePassword = (password: string) => {
        const newRegisterDetails: RegisterUserTempRequest = new RegisterUserTempRequest(registerDetails.username, password, registerDetails.password2, registerDetails.email);
        setRegisterDetails(newRegisterDetails);
    }

    const updatePassword2 = (password2: string) => {
        const newRegisterDetails: RegisterUserTempRequest = new RegisterUserTempRequest(registerDetails.username, registerDetails.password, password2, registerDetails.email);
        setRegisterDetails(newRegisterDetails);
    }

    const updateEmail = (email: string) => {
        const newRegisterDetails: RegisterUserTempRequest = new RegisterUserTempRequest(registerDetails.username, registerDetails.password, registerDetails.password2, email);
        setRegisterDetails(newRegisterDetails);
    }

    const submitRegisterDetails = async() => {

        console.log("register!");

        const properRegisterDetails: RegisterUserRequest = new RegisterUserRequest(registerDetails.username, registerDetails.password, registerDetails.email);

        const response = await register(properRegisterDetails);
        console.log(response);
    }

    return (
        <React.Fragment>
            <h1 className={classes.titleContainer}>
                {`Register`}
            </h1>
            <div className={classes.inputContainer}>
                <EntryField fieldName={"Username"} value={registerDetails.username} updateValue={updateName} />
                <EntryField fieldName={"Email"} value={registerDetails.email} updateValue={updateEmail} />
                <EntryField fieldName={"Password"} value={registerDetails.password} updateValue={updatePassword} />
                <EntryField fieldName={"Confirm Password"} value={registerDetails.password2} updateValue={updatePassword2} />
                <SubmitButton name={"Continue"} submit={submitRegisterDetails} />
            </div>
            
        </React.Fragment>
    )
}

export default RegisterPage;