import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import splashImage from "../../assets/images/splash-image.png";

const styles = makeStyles((theme) => ({
  headerContainer: {
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `row`,
    flexWrap: `wrap`,
    padding: `2%`,
  },
  titlesContainer: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `start`,
    alignItems: `center`,
    minWidth: `80vw`,
    margin: `0px`,
  },
  titleContainer: {
    padding: `1%`,
    width: `90vw`,
    maxWidth: `1000px`,
    color: `rgba(20,20,20,0.98)`,
    textAlign: `center`,
    fontSize: `40px`,
    margin: `0.4rem 0rem 0.4rem 0rem`,
    [theme.breakpoints.down("sm")]: {
      fontSize: `34px`,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: `28px`,
    },
  },
  subtitleContainer: {
    padding: `1%`,
    width: `90vw`,
    maxWidth: `1000px`,
    color: `rgba(20,20,20,0.98)`,
    textAlign: `center`,
    fontSize: `24px`,
    margin: `0.4rem 0rem 0.4rem 0rem`,
    [theme.breakpoints.down("sm")]: {
      fontSize: `20px`,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: `16px`,
    },
  },
  splashImage: {
    width: `90vw`,
    maxWidth: `1000px`,
  },
}));

const LandingPage = () => {
  const classes = styles();

  return (
    <React.Fragment>
      <div className={classes.headerContainer}>
        <div className={classes.titlesContainer}>
          <h1 className={classes.titleContainer}>
            {`Welcome to the USRC x SYNCS Competitive Coding Challenge 2021!`}
          </h1>
          <h2 className={classes.subtitleContainer}>
            {`This year's challenge is Auction's Eleven, a game about auctions, communication protocols, and adversarial strategy.`}
          </h2>
        </div>
        <img
          src={splashImage}
          alt={`Auction's Eleven`}
          className={`${classes.splashImage}`}
        />
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
