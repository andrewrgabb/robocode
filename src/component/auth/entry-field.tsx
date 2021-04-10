import React from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(theme => ({
    entryFieldContainer: {
        width: `30%`,
        margin: `20px`,
    }
}));

const EntryField = (props: {fieldName: string, value: string, updateValue: (newValue: string) => void}) => {

    const classes = styles();

    const {fieldName, value, updateValue} = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(e.currentTarget.value);
    }

    return (
        <TextField id={fieldName} className={classes.entryFieldContainer} label={fieldName} variant="outlined" value={value}
        onChange={handleChange} />
    )
}

export default EntryField;