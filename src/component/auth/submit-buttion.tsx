import React from 'react';
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(theme => ({
    buttonContainer: {
        padding: `10px`,
        margin: `20px`,
    }
}));

const SubmitButton = (props: {name: string, submit: () => void}) => {

    const classes = styles();

    const {name, submit} = props;

    return (
        <Button className={classes.buttonContainer} variant="contained" color="primary" onClick={submit}>
            {name}
        </Button>
    )
}

export default SubmitButton;