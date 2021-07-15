import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getTeamDetails, updateTeamDetails } from "../../service/user-service";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import UserContext from "../../context/user-context";
import { TextField } from "@material-ui/core";

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
  formInput: {
    margin: `20px 0px 20px 0px`,
  },
  nameBox: {
    minHeight: `1em`,
    marginBottom: `1em`,
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
  competitors: [initialCompetitor, JSON.parse(JSON.stringify(initialCompetitor)), JSON.parse(JSON.stringify(initialCompetitor))],
};

interface SubmissionError {
  error: boolean;
  success: boolean;
  message: string;
}

const inititalSubmissionError: SubmissionError = {
  error: false,
  success: false,
  message: "",
};

const TeamPage = () => {
  const classes = styles();

  const userContext = useContext(UserContext);

  const [teamDetails, setTeamDetails] = useState<TeamDetails | undefined>(
    undefined
  );
  const [submissionProcessing, setSubmissionProcessing] =
    useState<boolean>(false);

  const [submissionError, setSubmissionError] = useState<SubmissionError>(
    inititalSubmissionError
  );

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

  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!teamDetails) {
      return;
    }

    setSubmissionError({
      error: false,
      success: false,
      message: "",
    });

    setSubmissionProcessing(true);

    const submissionResponse = await updateTeamDetails(teamDetails);

    console.log({ submissionResponse });

    const message = await submissionResponse.text();

    console.log({ message });

    setSubmissionProcessing(false);

    if (!submissionResponse.ok) {
      setSubmissionError({
        error: true,
        success: false,
        message: message,
      });
      return;
    } else {
      setSubmissionError({
        error: false,
        success: true,
        message: "",
      });
    }
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
        >
          {!submissionProcessing ? `Update Details` : `Updating`}
        </Button>
      </Box>
    );
  };
  const renderSubmissionFailedBanner = () => {
    return submissionError.error ? (
      <div className={classes.errorBox}>
        <Box className={classes.errorPanel}>
          <Alert severity="error">
            <AlertTitle className={classes.errorTitle}>
              Error updating details
            </AlertTitle>
            {submissionError.message.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })}
          </Alert>
        </Box>
      </div>
    ) : null;
  };
  const renderSubmissionSucceededBanner = () => {
    return submissionError.success ? (
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

  const updateCompetitor = (
    value: string,
    competitorNumber: number,
    field: keyof Competitor
  ) => {
    if (!teamDetails) {
      return;
    }
    let competitors: Competitor[] = [...teamDetails.competitors];
    competitors[competitorNumber][field] = value;
    const newRegisterDetails: TeamDetails = {
      ...teamDetails,
      competitors: competitors,
    };
    setTeamDetails(newRegisterDetails);
  };

  const renderCompetitorInfo = (whichCompetitor: number) => {
    if (!teamDetails) {
      return null;
    }

    return (
      <React.Fragment>
        <span>Competitor {whichCompetitor + 1}</span>
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCompetitor(e.target.value, whichCompetitor, "name")
          }
          label="Full Name (as on certificate)"
          value={teamDetails.competitors[whichCompetitor]["name"] || ""}
          autoFocus
          required={0 === whichCompetitor}
          fullWidth
          variant="outlined"
        />
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCompetitor(e.target.value, whichCompetitor, "university")
          }
          label="University"
          value={teamDetails.competitors[whichCompetitor]["university"] || ""}
          autoFocus
          required={0 === whichCompetitor}
          fullWidth
          variant="outlined"
        />
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCompetitor(e.target.value, whichCompetitor, "unikey")
          }
          label="University Email"
          value={teamDetails.competitors[whichCompetitor]["unikey"] || ""}
          autoFocus
          required={0 === whichCompetitor}
          fullWidth
          variant="outlined"
        />
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCompetitor(e.target.value, whichCompetitor, "yeardeg")
          }
          label="Year + Degree"
          value={teamDetails.competitors[whichCompetitor]["yeardeg"] || ""}
          autoFocus
          required={0 === whichCompetitor}
          fullWidth
          variant="outlined"
        />
      </React.Fragment>
    );
  };

  const renderTeamName = () => {
    if (!teamDetails) {
      return null;
    }

    return (
      <React.Fragment>
        <span>Team Details</span>
        <TextField
          className={classes.formInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTeamDetails({ ...teamDetails, teamName: e.target.value })
          }
          label="Team Name"
          value={teamDetails.teamName}
          autoFocus
          required={true}
          fullWidth
          variant="outlined"
        />
      </React.Fragment>
    );
  };

  return (
    <div className={classes.userContent}>
      <h1 className={classes.titleContainer}>{`My Team`}</h1>
      <div className={classes.contentContainer}>
        <div
          className={classes.nameBox}
        >{`Welcome, ${userContext.currentUsername}. These are your team's details. 
            If you wish to change anything, edit the fields below
            and then click the 'Update Details' button at the bottom of 
            the page when you are done.`}</div>
        <form onSubmit={(event) => handleSubmission(event)}>
          {renderSubmissionSucceededBanner()}
          {renderSubmissionFailedBanner()}
          {renderTeamName()}
          {renderCompetitorInfo(0)}
          {renderCompetitorInfo(1)}
          {renderCompetitorInfo(2)}
          {renderSubmissionSucceededBanner()}
          {renderSubmissionFailedBanner()}
          <div className={classes.buttonBox}>{renderButton()}</div>
        </form>
      </div>
    </div>
  );
};

export default TeamPage;
