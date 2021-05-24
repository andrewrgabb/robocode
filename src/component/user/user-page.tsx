import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getLog, getStat } from "../../service/user-service";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import { CloudDownloadRounded } from "@material-ui/icons";

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
  rankingBox: {
    minHeight: `1em`,
    fontWeight: `bold`,
  },
  downloadsBox: {
    minHeight: `4rem`,
    marginBottom: `0.3rem`,
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
  },
  submissionBox: {
    minHeight: `2em`,
    fontStyle: `italic`,
  },
  dropfield: {
    border: `2px dashed grey`,
  },
  dropfieldContent: {
    padding: `1em`,
    fontSize: `20px`,
    cursor: `pointer`,
    textAlign: `center`,
  },
}));

interface UserStat {
  ranking: number;
  total: number;
}

const UserPage = () => {
  const classes = styles();

  const [stat, setStat] = useState<UserStat | undefined>(undefined);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      maxFiles: 1,
    });

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

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

    if (stat.hasLog) {
      fetchLog();
    }
  };

  const fetchLog = async () => {
    const log = await getLog();

    if (null === log) {
      return;
    }

    console.log("log: ");
    console.log(log);
  };

  const handleUpload = (file: File[]) => {
    console.log("hi");
  };

  const renderRanking = () => {
    if (undefined === stat) {
      return null;
    }

    return (
      <div className={classes.rankingBox}>
        {`Ranking: ${stat.ranking} / ${stat.total}`}
      </div>
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
          <span className={classes.downloadLink}>
            Click to download the coding template
          </span>
        </p>
        <p className={classes.downloadsText}>
          <CloudDownloadRounded className={classes.downloadIcon} />
          <span className={classes.downloadLink}>
            Click to download your latest log file
          </span>
        </p>
      </div>
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
            </div>
          </div>
        </div>
        {`Uploaded File`}
        {acceptedFileItems}
        {`Submit Button`}
      </div>

      //onChange={(file) => handleUpload(file)}
    );
  };

  useEffect(() => {
    fetchStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.userContent}>
      <h1 className={classes.titleContainer}>{`My Account`}</h1>
      <div className={classes.contentContainer}>
        {renderRanking()}
        {renderDownloadLinks()}
        {renderSubmitCode()}
      </div>
    </div>
  );
};

export default UserPage;
