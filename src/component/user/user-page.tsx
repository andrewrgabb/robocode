import React, { useEffect, useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getLog, getStat } from '../../service/user-service';
import {DropzoneAreaBase, FileObject} from 'material-ui-dropzone'

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
    },
    contentItem: {
        minHeight: `2em`,
    }
}));

interface UserStat {
    ranking: number;
    total: number;
}

const UserPage = () => {

    const classes = styles();

    const [stat, setStat] = useState<UserStat | undefined>(undefined);

    const [files, setFiles] = useState<FileObject[]>([]);

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

    const renderSubmitCode = () => {

        return (
            <div className={classes.contentItem}>
                {`Submit Code here: ...`}
                <DropzoneAreaBase 
                    acceptedFiles={['.png']} 
                    filesLimit={1} 
                    maxFileSize={100000} 
                    fileObjects={files} 
                    onAdd={(newFiles) => setFiles(newFiles)} 
                />
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
                {renderSubmitCode()}
            </div>
        </div>
    )
}

export default UserPage;
