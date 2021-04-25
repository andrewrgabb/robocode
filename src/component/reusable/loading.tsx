import Box from "@material-ui/core/Box";
import React from "react";
import loading from '../../assets/images/loading.gif';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    img: {
        width: '200px',
        maxWidth: '50%',
    }
});

const Loading =  () => {

    const classes = styles();

    return (
        <Box className={classes.root}>
            <img className={classes.img} src={loading} alt="loading..." />
        </Box>
    );
}

export default Loading;