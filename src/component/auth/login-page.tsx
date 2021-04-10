import React, {useContext, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LoginUserRequest} from '../../transport/auth';
import EntryField from './entry-field';
import SubmitButton from './submit-buttion';
import {login} from '../../service/auth-service';
import UserContext from '../../context/user-context';

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

const LoginPage = () => {

    const classes = styles();

    const userContext = useContext(UserContext);

    const [loginDetails, setLoginDetails] = useState(new LoginUserRequest("", ""));

    const updateName = (name: string) => {
        const newLoginDetails: LoginUserRequest = new LoginUserRequest(name, loginDetails.password);
        setLoginDetails(newLoginDetails);
    }

    const updatePassword = (password: string) => {
        const newLoginDetails: LoginUserRequest = new LoginUserRequest(loginDetails.username, password);
        setLoginDetails(newLoginDetails);
    }

    const submitLoginDetails = async() => {

        console.log("login!");

        const response = await login(loginDetails);
        console.log(response);

        if (response) {
            userContext.setCurrentUsername(loginDetails.username);
        }
    }

    return (
        <React.Fragment>
            <h1 className={classes.titleContainer}>
                {`Login`}
            </h1>
            <div className={classes.inputContainer}>
                <EntryField fieldName={"Username"} value={loginDetails.username} updateValue={updateName} />
                <EntryField fieldName={"Password"} value={loginDetails.password} updateValue={updatePassword} />
                <SubmitButton name={"Continue"} submit={submitLoginDetails} />
            </div>
        </React.Fragment>
    )
}

export default LoginPage;