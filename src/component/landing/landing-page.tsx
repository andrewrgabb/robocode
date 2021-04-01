import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import splashImage from '../../assets/images/splash-image.png';

const styles = makeStyles(theme => ({
    titleContainer: {
        padding: `10px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `40px`,
        margin: `20px 0px 20px 0px`,
    },
    subtitleContainer: {
        padding: `10px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `24px`,
        margin: `0px 0px 20px 0px`,
    },
    splashImage: {
        width: `100%`,
    },
}));

const LandingPage = () => {

    const classes = styles();

    return (
        <React.Fragment>
            <h1 className={classes.titleContainer}>
                {`Welcome to the USRC x SYNCS Competitive Coding Challenge 2021!`}
            </h1>
            <h2 className={classes.subtitleContainer}>
                {`This year's challenge is Auction's Eleven, a game about auctions, communication protocols, and adversarial strategy.`}
            </h2>
            <img src={splashImage} alt={`Auction's Eleven`} className={`${classes.splashImage}`} />
            
        </React.Fragment>
    )
}

export default LandingPage;