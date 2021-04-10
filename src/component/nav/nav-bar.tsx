import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {getTopNavItems, ON_ALL_PAGES} from "./nav-items";
import logo from '../../assets/images/logo.svg';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {NavLink} from "react-router-dom";
import UserContext from "../../context/user-context";
import Button from "@material-ui/core/Button";

import {doLogout} from '../../service/auth-service'

const styles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
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
    authButtons: {
        marginLeft: '10px',
        marginRight: '10px',
        textTransform: "capitalize",
        [theme.breakpoints.down('xs')]: {
            fontSize: "smaller",
        },
    },
}));



   



const NavBar = () => {

    const classes = styles();
    const userContext = useContext(UserContext);

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

    const renderLoginAuth = () => {
        return (
            <div>
                <NavLink to={{pathname: "/login", search: ""}} className={`${classes.removeTextDecoration}`}>
                    <Button color="primary" className={classes.authButtons}>
                        {`Login`}
                    </Button>
                </NavLink>
                <NavLink to={{pathname: "/register", search: ""}} className={`${classes.removeTextDecoration}`}>
                <Button variant="contained" color="primary" className={classes.authButtons}>
                    {`Register`}
                </Button>
                </NavLink>
            </div>
        );
    };

    const renderLogoutAuth = () => {
        return (
            <div>
                <Button variant="contained" color="primary" className={classes.authButtons} onClick={() => doLogout(userContext)}>
                    {`Logout`}
                </Button>
            </div>
        );
    };
    
    const renderNavButtons = () => {
    
        const classes = styles();
        
    
        const topNavItems = getTopNavItems();
    
        return topNavItems
            .filter(navItem => navItem.loggedIn === userContext.isUserLoggedIn() || navItem.loggedIn === ON_ALL_PAGES) //userContext.isUserLoggedIn() 
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


    return (
        <div>
            <AppBar id='nav-bar' position="fixed" className={classes.bar}>
                <Toolbar>
                    {renderLogo()}
                    {renderNavButtons()}
                    <div className={classes.grow}/>
                    {userContext.isUserLoggedIn() ? renderLogoutAuth() : renderLoginAuth()}
                </Toolbar>
            </AppBar>
        </div>
        
    );
}

export default NavBar;
