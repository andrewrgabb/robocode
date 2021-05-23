import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { register } from "../../service/auth-service";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { isUsernameValid, isPasswordValid, isEmailValid } from "./validator";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const styles = makeStyles((theme) => ({
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
    fontSize: `28x`,
    [theme.breakpoints.up("sm")]: {
      fontSize: `40px`,
    },
  },
  inputContainer: {
    minHeight: `40px`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    backgroundColor: `rgba(250,250,250,0.98)`,
    borderRadius: `20px`,
    padding: `20px`,
    width: `90vw`,
    maxWidth: `400px`,
  },
  formInput: {
    margin: `20px 0px 20px 0px`,
  },
  continueButton: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    padding: `10px`,
  },
  errorPanel: {
    paddingBottom: 10 + "px",
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
    display: "none",
  },
  hideAdornoment: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

type registerDetailsType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type registerErrorType = {
  error: boolean;
  message: string;
};

type ErrorType = {
  username: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

const initialRegisterDetails: registerDetailsType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const inititalRegisterError: registerErrorType = {
  error: false,
  message: "",
};

const initialError: ErrorType = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
};

const RegisterPage = (props: any) => {
  const classes = styles();

  const [registerDetails, setRegisterDetails] = useState<registerDetailsType>(
    initialRegisterDetails
  );
  const [registerError, setRegisterError] = useState<registerErrorType>(
    inititalRegisterError
  );
  const [error, setError] = useState<ErrorType>(initialError);
  const [registrationSucceeded, setRegistrationSucceeded] =
    useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const validateForm = () => {
    const errors: ErrorType = {
      username: !isUsernameValid(registerDetails.username),
      email: !isEmailValid(registerDetails.email),
      password: !isPasswordValid(registerDetails.password),
      confirmPassword:
        !isPasswordValid(registerDetails.confirmPassword) ||
        registerDetails.password !== registerDetails.confirmPassword,
    };
    setError(errors);
    return !(
      errors.username ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    );
  };

  const handleRegistration = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      setRegisterError({
        error: true,
        message: "One or more fields are invalid",
      });
      return;
    }

    const registerUserRequest = {
      username: registerDetails.username,
      email: registerDetails.email,
      password: registerDetails.password,
    };

    const registrationResponse = await register(registerUserRequest);

    //console.log(registrationResponse);

    if (!registrationResponse.ok) {
      const message = await registrationResponse.text();
      setRegisterError({
        error: true,
        message: message,
      });
      return;
    }

    setRegistrationSucceeded(true);
  };

  const updateUsername = (username: string) => {
    const newRegisterDetails: registerDetailsType = {
      ...registerDetails,
      username: username,
    };
    setRegisterDetails(newRegisterDetails);
  };

  const updateEmail = (email: string) => {
    const newRegisterDetails: registerDetailsType = {
      ...registerDetails,
      email: email,
    };
    setRegisterDetails(newRegisterDetails);
  };

  const updatePassword = (password: string) => {
    const newRegisterDetails: registerDetailsType = {
      ...registerDetails,
      password: password,
    };
    setRegisterDetails(newRegisterDetails);
  };

  const updateConfirmPassword = (confirmPassword: string) => {
    const newRegisterDetails: registerDetailsType = {
      ...registerDetails,
      confirmPassword: confirmPassword,
    };
    setRegisterDetails(newRegisterDetails);
  };

  const getConfirmPasswordErrorText = () => {
    if (registerDetails.password !== registerDetails.confirmPassword) {
      return "Passwords must match.";
    }

    return error.confirmPassword ? "Invalid password." : "";
  };

  const renderSignupFailedBanner = () => {
    if (registerError.error) {
      return (
        <Box className={classes.errorPanel}>
          <Alert severity="error">
            <AlertTitle className={classes.errorTitle}>
              Registration failed
            </AlertTitle>
            {registerError.message}
          </Alert>
        </Box>
      );
    }
  };

  const passwordRequirementTooltip = () => {
    return (
      <div>
        <span style={{ display: "block" }}>- More than 6 characters</span>
        <span style={{ display: "block" }}>- At least one number</span>
      </div>
    );
  };

  const getTooltipPlacement = (): "top" => {
    return "top";
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event: any) => {
    event.preventDefault();
  };

  const renderUsernameSection = () => {
    return (
      <React.Fragment>
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateUsername(e.target.value)
          }
          label="Username"
          value={registerDetails.username}
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={error.username}
          helperText={error.username ? "Invalid username." : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.hideAdornoment}
              >
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </React.Fragment>
    );
  };

  const renderEmailSection = () => {
    return (
      <React.Fragment>
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateEmail(e.target.value)
          }
          label="Email"
          value={registerDetails.email}
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={error.email}
          helperText={error.email ? "Invalid email." : ""}
          InputProps={{
            autoComplete: "username",
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.hideAdornoment}
              >
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </React.Fragment>
    );
  };

  const renderPasswordSection = () => {
    return (
      <React.Fragment>
        <Tooltip
          placement={getTooltipPlacement()}
          arrow
          enterTouchDelay={0}
          title={passwordRequirementTooltip()}
        >
          <TextField
            className={classes.formInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePassword(e.target.value)
            }
            label="Password"
            value={registerDetails.password}
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={error.password}
            helperText={error.password ? "Invalid password." : ""}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              autoComplete: "new-password",
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.hideAdornoment}
                >
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        <Tooltip
          placement={getTooltipPlacement()}
          arrow
          enterTouchDelay={0}
          title={passwordRequirementTooltip()}
        >
          <TextField
            className={classes.formInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfirmPassword(e.target.value)
            }
            label="Confirm Password"
            value={registerDetails.confirmPassword}
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={error.confirmPassword}
            helperText={getConfirmPasswordErrorText()}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              autoComplete: "new-password",
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.hideAdornoment}
                >
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
      </React.Fragment>
    );
  };

  const renderButton = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Button
          className={classes.continueButton}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {`Continue`}
        </Button>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.titleContainer}>{`Register`}</h1>
      <div className={`${classes.inputContainer}`}>
        <form
          className={`${registrationSucceeded ? classes.hide : classes.show}`}
          onSubmit={(event) => handleRegistration(event)}
        >
          {renderSignupFailedBanner()}
          {renderUsernameSection()}
          {renderEmailSection()}
          {renderPasswordSection()}
          {renderButton()}
        </form>
        <div
          className={`${
            registrationSucceeded ? classes.showText : classes.hide
          }`}
        >
          {`Registration was successful, please check your emails to confirm your registration.`}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
