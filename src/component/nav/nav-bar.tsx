import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {getTopNavItems, ON_ALL_PAGES} from "./nav-items";
import logo from '../../assets/images/logo.svg';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {NavLink} from "react-router-dom";

const styles = makeStyles(theme => ({
    bar: {
        width: `100%`,
        height: `60px`,
        backgroundColor: theme.palette.common.white,
    },
    logo: {
        display: `flex`,
        height: `40px`,
        alignItems: 'center',
        cursor: 'pointer',
        padding: `0px 10px 0px 10px`,
        margin: `0px 5px 0px 0px`,
    },
    logoImage: {
        height: `40px`,
    },
    title: {
        fontSize: `24px`,
        color: theme.palette.primary.main,
        padding: `0px 0px 0px 10px`,
    },
    appBarButton: {
        height: `40px`,
        margin: `0px 5px 0px 5px`,
        display: `flex`,
        alignItems: 'center',
        justifyContent: `center`,
        cursor: 'pointer',
    },
    menuButtonLink: {
        borderRadius: `10px`,
        textDecoration: "none",
        "&.active": {
            backgroundColor: "#f8f9fa",
        },
        "&:hover": {
            backgroundColor: "#f8f9fa",
        },
    },
    removeTextDecoration: {
        textDecoration: "none",
    },
    menuButtonText: {
        paddingTop: `1px`,
        textTransform: "capitalize",
        margin: theme.spacing(1),
        fontWeight: "bold",
        fontSize: `20px`,
        color: `rgba(50,50,50,0.90)`,
    },
}));

const renderLogo = () => {

    const classes = styles();

    return (
        <React.Fragment>
            <NavLink exact={true} to={'/'} id='logo' className={`${classes.logo} ${classes.menuButtonLink}`} >
                <img className={classes.logoImage} alt="logo" src={logo}/>
                <h1 className={`${classes.title}`} >
                    {`Auction's Eleven`}
                </h1>
                
            </NavLink>
        </React.Fragment>
    )
}

const renderNavButtons = () => {

    const classes = styles();

    const topNavItems = getTopNavItems();

    return topNavItems
        .filter(navItem => navItem.loggedIn === false || navItem.loggedIn === ON_ALL_PAGES) //userContext.isUserLoggedIn() 
        .map((navItem, index) => {
            return <NavLink key={`top-nav-item-${index}`} exact={true}
                            className={`${classes.removeTextDecoration} ${classes.appBarButton} ${classes.menuButtonLink}`}
                            to={navItem.to}>
                            <span className={classes.menuButtonText}>{navItem.text}</span>
                    </NavLink>

            /*
            return <div className={`${classes.appBarButton} ${classes.menuButtonLink}`} key={`top-nav-item-${index}`}>
                <span className={classes.menuButtonText}>{navItem.text}</span>
            </div>*/
        })
}

   



const NavBar = () => {

    const classes = styles();

    return (
        <div>
            <AppBar id='nav-bar' position="fixed" className={classes.bar}>
                <Toolbar>
                    {renderLogo()}
                    {renderNavButtons()}
                </Toolbar>
            </AppBar>
        </div>
        
    );
}

export default NavBar;
