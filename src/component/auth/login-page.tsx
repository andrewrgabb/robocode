import React, { useContext, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { login } from "../../service/auth-service";
import UserContext from "../../context/user-context";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { AccountCircle, Lock } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  errorTitle: {
    fontWeight: "bold",
  },
  errorPanel: {
    paddingBottom: 10 + "px",
    textAlign: "left",
    width: `100%`,
  },
  hideAdornoment: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

interface LoginDetails {
  username: string;
  password: string;
}

const initialLoginDetails: LoginDetails = {
  username: "",
  password: "",
};

interface LoginError {
  error: boolean;
  message: string;
}

const inititalLoginError: LoginError = {
  error: false,
  message: "",
};

const LoginPage = () => {
  const classes = styles();

  const userContext = useContext(UserContext);
  const history = useHistory();

  const [loginDetails, setLoginDetails] =
    useState<LoginDetails>(initialLoginDetails);
  const [loginError, setLoginError] = useState<LoginError>(inititalLoginError);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginUserRequest = {
      username: loginDetails.username,
      password: loginDetails.password,
    };

    const loginResponse = await login(loginUserRequest);

    if (!loginResponse.ok) {
      const message = await loginResponse.text();
      setLoginError({
        error: true,
        message: message,
      });
      return;
    }

    userContext.setCurrentUsername(loginDetails.username);
    history.push("/");
  };

  const updateUsername = (username: string) => {
    const newLoginDetails: LoginDetails = {
      ...loginDetails,
      username: username,
    };
    setLoginDetails(newLoginDetails);
  };

  const updatePassword = (password: string) => {
    const newLoginDetails: LoginDetails = {
      ...loginDetails,
      password: password,
    };
    setLoginDetails(newLoginDetails);
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
          value={loginDetails.username}
          autoFocus
          required
          fullWidth
          variant="outlined"
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

  const renderPasswordSection = () => {
    return (
      <React.Fragment>
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updatePassword(e.target.value)
          }
          label="Password"
          value={loginDetails.password}
          autoFocus
          required
          type="password"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.hideAdornoment}
              >
                <Lock />
              </InputAdornment>
            ),
          }}
        />
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

  const renderLoginFailedBanner = () => {
    if (loginError.error) {
      return (
        <Box className={classes.errorPanel}>
          <Alert severity="error">
            <AlertTitle className={classes.errorTitle}>Login failed</AlertTitle>
            {loginError.message}
          </Alert>
        </Box>
      );
    }
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.titleContainer}>{`Login`}</h1>
      <div style={{ display: `block` }} className={classes.inputContainer}>
        <form onSubmit={(event) => handleLogin(event)}>
          {renderLoginFailedBanner()}
          {renderUsernameSection()}
          {renderPasswordSection()}
          {renderButton()}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
