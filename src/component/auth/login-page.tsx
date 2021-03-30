import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(theme => ({
    titleContainer: {
        height: `100px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `40px`,
    },
    subtitleContainer: {
        height: `100px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `28px`,
    }
}));

const LoginPage = () => {

    const classes = styles();

    return (
        <React.Fragment>
            <h1 className={classes.titleContainer}>
                {`Welcome to Login Page!`}
            </h1>
            <h2 className={classes.subtitleContainer}>
                {`This year's challenge is Auction's Eleven, a game about auctions, communication protocols, and adversarial strategy.`}
            </h2>
        </React.Fragment>
    )
}

export default LoginPage;