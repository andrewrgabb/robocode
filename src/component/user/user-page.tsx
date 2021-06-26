import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getStat, submitCode } from "../../service/user-service";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import { CloudDownloadRounded } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { getLogUrl, getCodepackUrl } from "../../paths/api";
import UserContext from "../../context/user-context";
import { Competition } from "../../transport/competition";

const styles = makeStyles((theme) => ({
  userContent: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `start`,
    padding: `0px 0px 10px 0px`,
    color: `rgba(20,20,20,0.98)`,
  },
  titleContainer: {
    height: `40px`,
    textAlign: `center`,
    fontSize: `40px`,
    [theme.breakpoints.down("sm")]: {
      fontSize: `34px`,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: `28px`,
      height: `34px`,
    },
  },
  contentContainer: {
    minHeight: `10vw`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `start`,
    alignItems: `left`,
    backgroundColor: `rgba(250,250,250,0.98)`,
    borderRadius: `20px`,
    padding: `24px`,
    width: `90vw`,
    maxWidth: `600px`,
    fontSize: `24px`,
    lineHeight: `40px`,
    [theme.breakpoints.down("sm")]: {
      fontSize: `18px`,
      lineHeight: `24px`,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: `14px`,
      lineHeight: `18px`,
    },
  },
  subtitle: {
    textAlign: `left`,
    fontWeight: `bold`,
    marginBottom: `6px`,
  },
  nameBox: {
    minHeight: `1em`,
  },
  rankingBox: {
    minHeight: `1em`,
    fontWeight: `bold`,
    marginBottom: `1.2rem`,
  },
  continueButton: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    padding: `10px`,
  },
  downloadsBox: {
    minHeight: `4rem`,
    marginBottom: `1.5rem`,
  },
  downloadsText: {
    display: `flex`,
    alignItems: `center`,
    margin: `0.7rem 0rem 0.7rem 0rem`,
  },
  downloadIcon: {
    width: `28px`,
    height: `28px`,
    marginRight: `8px`,
  },
  downloadLink: {
    textDecoration: `underline`,
    cursor: `pointer`,
    color: `black`,
  },
  submissionBox: {
    minHeight: `2em`,
  },
  submissionText: {},
  dropfield: {
    border: `2px dashed grey`,
    marginBottom: `1rem`,
  },
  dropfieldContent: {
    padding: `1em`,
    cursor: `pointer`,
    textAlign: `center`,
    fontStyle: `italic`,
  },
  buttonBox: {
    display: `flex`,
    justifyContent: `center`,
  },
  errorTitle: {
    fontWeight: "bold",
  },
  errorBox: {
    display: `flex`,
    justifyContent: `center`,
  },
  errorPanel: {
    paddingBottom: 10 + "px",
    textAlign: "left",
    width: `70%`,
  },
  smallRegisterOkText: {
    textAlign: "center",
    fontSize: "0.8em",
    margin: "3vw",
  },
}));

interface UserStat {
  ranking: number;
  total: number;
}

interface LoginError {
  error: boolean;
  success: boolean;
  message: string;
}

const inititalLoginError: LoginError = {
  error: false,
  success: false,
  message: "",
};

type UserPageProps = {
  compInfo: Competition;
};

const UserPage = (props: UserPageProps) => {
  const { compInfo } = props;
  const classes = styles();

  const userContext = useContext(UserContext);

  const [stat, setStat] = useState<UserStat | undefined>(undefined);
  const [loginError, setLoginError] = useState<LoginError>(inititalLoginError);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".py",
    maxFiles: 1,
    maxSize: 3145728,
  });

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

  useEffect(() => {
    fetchStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStat = async () => {
    const stat = await getStat();

    if (null === stat) {
      return;
    }

    console.log("stat: ");
    console.log(stat);

    const newStat: UserStat = {
      ranking: stat.ranking,
      total: stat.total,
    };
    setStat(newStat);
  };

  const handleUpload = async () => {
    if (acceptedFiles.length > 0) {
      const fileToSubmit: File = acceptedFiles[0];

      const submissionResponse = await submitCode(fileToSubmit);

      if (!submissionResponse.ok) {
        setLoginError({
          error: true,
          success: false,
          message: submissionResponse.message,
        });
        return;
      } else {
        setLoginError({
          error: false,
          success: true,
          message: submissionResponse.message,
        });
      }
    }
  };

  const renderRanking = () => {
    if (undefined === stat) {
      return null;
    }

    return (
      <React.Fragment>
        <div className={classes.rankingBox}>
          {`Ranking: ${stat.ranking} / ${stat.total}`}
        </div>
      </React.Fragment>
    );
  };

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const renderDownloadLinks = () => {
    return (
      <div className={classes.downloadsBox}>
        <p className={classes.downloadsText}>
          <CloudDownloadRounded className={classes.downloadIcon} />
          <a href={getCodepackUrl()} target="_blank" rel="noopener noreferrer">
            <span className={classes.downloadLink}>
              Click to download the coding template
            </span>
          </a>
        </p>
        <p className={classes.downloadsText}>
          <CloudDownloadRounded className={classes.downloadIcon} />
          <a href={getLogUrl()} target="_blank" rel="noopener noreferrer">
            <span className={classes.downloadLink}>
              Click to download your latest log file
            </span>
          </a>
        </p>
      </div>
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
        width="70%"
      >
        <Button
          className={classes.continueButton}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleUpload()}
        >
          {`Submit`}
        </Button>
      </Box>
    );
  };

  const renderSubmitCode = () => {
    return (
      <div className={classes.submissionBox}>
        <div className={classes.subtitle}>{`Code Submission`}</div>
        <div className={classes.dropfield}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className={classes.dropfieldContent}>
              <p>Drop your submission here, or click to upload</p>
              <p>
                Limits: Only *.py files are accepted and the file size must be
                less than 3mb
              </p>
            </div>
          </div>
        </div>
        <div>
          <span className={classes.subtitle}>{`Uploaded File: `}</span>

          {acceptedFileItems.length > 0
            ? acceptedFileItems
            : "(Nothing uploaded yet)"}
        </div>
        <div className={classes.buttonBox}>{renderButton()}</div>
      </div>
    );
  };

  const renderSubmissionFailedBanner = () => {
    if (loginError.error) {
      return (
        <div className={classes.errorBox}>
          <Box className={classes.errorPanel}>
            <Alert severity="error">
              <AlertTitle className={classes.errorTitle}>
                Submission failed
              </AlertTitle>
              {loginError.message}
            </Alert>
          </Box>
        </div>
      );
    }
  };
  const renderSubmissionSucceededBanner = () => {
    if (loginError.success) {
      return (
        <div className={classes.errorBox}>
          <Box className={classes.errorPanel}>
            <Alert severity="success">
              <AlertTitle className={classes.errorTitle}>
                Submission success!
              </AlertTitle>
              {loginError.message.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })}
            </Alert>
          </Box>
        </div>
      );
    }
  };
  if (compInfo.status === "launched" || compInfo.launchDate < Date.now()) {
    return (
      <div className={classes.userContent}>
        <h1 className={classes.titleContainer}>{`My Account`}</h1>
        <div className={classes.contentContainer}>
          <div
            className={classes.nameBox}
          >{`Welcome, ${userContext.currentUsername}.`}</div>
          {renderRanking()}
          {renderDownloadLinks()}
          {renderSubmissionFailedBanner()}
          {renderSubmissionSucceededBanner()}
          {renderSubmitCode()}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.userContent}>
        <h1 className={classes.titleContainer}>{`My Account`}</h1>
        <div className={classes.contentContainer}>
          <div
            className={classes.nameBox}
          >{`Welcome, ${userContext.currentUsername}.`}</div>
          <br></br>
          <span className={classes.smallRegisterOkText}>
            You've successfully registered! Come back when the competition has
            started.
          </span>
        </div>
      </div>
    );
  }
};

export default UserPage;
