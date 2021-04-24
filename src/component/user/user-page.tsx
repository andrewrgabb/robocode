import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(theme => ({
    userContent: {
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
}));


const UserPage = () => {

    const classes = styles();

    return (
        <div className={classes.userContent}>
            <h1 className={classes.titleContainer}>
                {`Rules`}
            </h1>
            <div>
                Submit code here.
            </div>
        </div>
    )
}

export default UserPage;