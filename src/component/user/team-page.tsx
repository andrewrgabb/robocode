import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  getStat,
  getTeamDetails,
  submitCode,
  updateTeamDetails,
} from "../../service/user-service";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import { CloudDownloadRounded } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { getLogUrl, getCodepackUrl } from "../../paths/api";
import UserContext from "../../context/user-context";

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

interface Competitor {
  name: string;
  university: string;
  unikey: string;
  yeardeg: string;
}

type TeamDetails = {
  teamName: string;
  competitors: Competitor[];
};

const initialCompetitor: Competitor = {
  name: "",
  university: "",
  unikey: "",
  yeardeg: "",
};

const initialTeamDetails: TeamDetails = {
  teamName: "",
  competitors: [initialCompetitor, initialCompetitor, initialCompetitor],
};

const TeamPage = () => {
  const classes = styles();

  const userContext = useContext(UserContext);

  const [teamDetails, setTeamDetails] = useState<TeamDetails | undefined>(
    undefined
  );
  const [submissionProcessing, setSubmissionProcessing] =
    useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchTeamDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTeamDetails = async () => {
    const fetchedTeamDetails: TeamDetails | null = await getTeamDetails();

    let newTeamDetails: TeamDetails = initialTeamDetails;

    if (userContext.currentUsername) {
      newTeamDetails.teamName = userContext.currentUsername;
    }

    if (fetchedTeamDetails) {
      newTeamDetails.teamName = fetchedTeamDetails.teamName;

      fetchedTeamDetails.competitors.forEach(
        (competitor: Competitor, index: number) => {
          newTeamDetails.competitors[index] = competitor;
        }
      );
    }

    console.log({ newTeamDetails });
    setTeamDetails(newTeamDetails);
  };

  const handleSubmission = async () => {
    if (!teamDetails) {
      return;
    }

    setSubmissionSuccess(false);

    setSubmissionProcessing(true);

    await updateTeamDetails(teamDetails);

    setSubmissionProcessing(false);

    setSubmissionSuccess(true);
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
          disabled={submissionProcessing}
          fullWidth
          onClick={() => handleSubmission()}
        >
          {!submissionProcessing ? `Update Details` : `Updating`}
        </Button>
      </Box>
    );
  };

  const renderSubmissionSucceededBanner = () => {
    return submissionSuccess ? (
      <div className={classes.errorBox}>
        <Box className={classes.errorPanel}>
          <Alert severity="success">
            <AlertTitle className={classes.errorTitle}>
              Details successfully changed!
            </AlertTitle>
          </Alert>
        </Box>
      </div>
    ) : null;
  };
  return (
    <div className={classes.userContent}>
      <h1 className={classes.titleContainer}>{`My Team`}</h1>
      <div className={classes.contentContainer}>
        <div
          className={classes.nameBox}
        >{`Welcome, ${userContext.currentUsername}. These are your team's details. 
            If you wish to change anything, edit the fields below
            and then clicking the 'Update Details' button at the bottom of 
            the page to save any changes.`}</div>

        {renderSubmissionSucceededBanner()}
        <div className={classes.buttonBox}>{renderButton()}</div>
      </div>
    </div>
  );
};

export default TeamPage;
