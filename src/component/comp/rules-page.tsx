import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { relative } from 'node:path';

const styles = makeStyles(theme => ({
    rulesContent: {
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `start`,
        padding: `0px 0px 10px 0px`,
    },
    titleContainer: {
        height: `40px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `40px`,
    },
    gdoc: {
        minWidth: `760px`,
        minHeight: `80vh`,
    },
}));

const RulesPage = () => {

    const classes = styles();

    return (
        <div className={classes.rulesContent}>
            <h1 className={classes.titleContainer}>
                {`Rules`}
            </h1>
            <iframe title="Rules" className={classes.gdoc} src="https://docs.google.com/document/d/e/2PACX-1vSNpVnOyavZciymS0zAVRqNxOiOQLMQzUGUPQYkibLR8mTCosKnnKMvLCXLItUTjSOnj9gyJ-eJ7YJp/pub?embedded=true"></iframe>
        </div>
    )
}

export default RulesPage;