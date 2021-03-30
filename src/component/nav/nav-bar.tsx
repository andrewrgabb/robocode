import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {getTopNavItems, ON_ALL_PAGES} from "./nav-items";
import logo from '../../assets/images/logo/auctions11-logo.svg';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {NavLink} from "react-router-dom";

const styles = makeStyles(theme => ({
    bar: {
        width: 100 + '%',
        height: 60 + 'px',
        backgroundColor: theme.palette.common.white,
    },
    logo: {
        display: `flex`,
        height: `100%`,
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: `10px`,
    },
    logoImage: {
        height: `50px`,
    },
    title: {
        fontSize: `24px`,
        color: theme.palette.primary.main,
        //paddingLeft: `12px`,
    },
    appBarButton: {
        marginLeft: 4 + 'px',
        marginRight: 4 + 'px',
        display: `flex`,
        alignItems: 'center',
        cursor: 'pointer',
    },
    menuButtonLink: {
        padding: `10px`,
        borderRadius: `10px`,
        textDecoration: "none",
        "&.active": {
            backgroundColor: "#f8f9fa",
        },
        "&:hover": {
            backgroundColor: "#f8f9fa",
        },
    },
    homeButtonLink: {
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
            <NavLink exact={true} to={'/'} id='logo' className={`${classes.logo} ${classes.homeButtonLink}`} >
                <img className={classes.logoImage} alt="logo" src={logo}/>
                <h1 className={`${classes.title} ${classes.menuButtonLink}`} >
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
            return <div className={`${classes.appBarButton}`} key={`top-nav-item-${index}`}>
                        <NavLink exact={true}
                             className={classes.menuButtonLink}
                             to={navItem.to}>
                            <span className={classes.menuButtonText}>{navItem.text}</span>
                        </NavLink>
                    </div>

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
