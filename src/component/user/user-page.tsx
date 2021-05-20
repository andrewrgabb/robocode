import React, { useEffect, useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getLog, getStat } from '../../service/user-service';
import {useDropzone} from 'react-dropzone';
import { FileWithPath } from "file-selector";

const styles = makeStyles(theme => ({
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
    },
    contentContainer: {
        minHeight: `10vw`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `start`,
        alignItems: `left`,
        backgroundColor: `rgba(250,250,250,0.98)`,
        borderRadius: `20px`,
        padding: `20px`,
        width: `auto`,
        fontSize: `24px`,
        lineHeight: `32px`,
    },
    subtitle: {
        textAlign: `center`,
    },
    contentItem: {
        marginTop: `1em`,
        minHeight: `2em`,
    },
    dropdown: {
        border: `2px dashed grey`,
    },
    dropdownContent: {
        padding: `1em`,
        fontSize: `20px`,
        cursor: `pointer`,
    }
}));

interface UserStat {
    ranking: number;
    total: number;
}

const UserPage = () => {

    const classes = styles();

    const [stat, setStat] = useState<UserStat | undefined>(undefined);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
      });

    useEffect(() => {
        console.log(acceptedFiles);
    }, [acceptedFiles])

    const fetchStat = async() => {

        const stat = await getStat();

        if (null === stat) {
            return;
        }
        
        console.log("stat: ");
        console.log(stat);
    
        const newStat: UserStat = {
            ranking: stat.ranking,
            total: stat.total,
        }
        setStat(newStat);

        if (stat.hasLog) {
            fetchLog();
        }
    }

    const fetchLog = async() => {

        const log = await getLog();

        if (null === log) {
            return;
        }
        
        console.log("log: ");
        console.log(log);
    }

    const handleUpload = (file: File[]) => {
        console.log("hi");
    }

    const renderRanking = () => {

        if (undefined === stat) {
            return null;
        }

        return (
            <div className={classes.contentItem}>
                {`Ranking: ${stat.ranking} / ${stat.total}`}
            </div>

        );
    }

    const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
    ));

    const renderDownloadLinks = () => {

        return (
            <React.Fragment>
                <div>
                    Download the coding template.
                </div>
                <div>
                    Download your latest log file.
                </div>
            </React.Fragment>
        );
    }

    const renderSubmitCode = () => {

        return (
            <div className={classes.contentItem}>
                <div className={classes.subtitle}>
                    {`Code Submission`}
                </div>
                <div className={classes.dropdown}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <div className={classes.dropdownContent}>
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </div>
                </div>
                {`Uploaded File`}
                {acceptedFileItems}
                {`Submit Button`}
            </div>

            //onChange={(file) => handleUpload(file)}
        );
    }

    useEffect(() => {
        fetchStat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className={classes.userContent}>
            <h1 className={classes.titleContainer}>
                {`My Account`}
            </h1>
            <div className={classes.contentContainer} >
                {renderRanking()}
                {renderDownloadLinks()}
                {renderSubmitCode()}
            </div>
        </div>
    )
}

export default UserPage;
