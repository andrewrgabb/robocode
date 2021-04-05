import Box from "@material-ui/core/Box";
import React from "react";
import loading from '../../assets/images/loading.gif';

const ProgressSpinner =  () => {
    return (
        <Box display="flex"
             flexDirection="column"
             justifyContent="center"
             alignItems="center"
             minHeight="60vh">
            <img src={loading} alt="loading..." />
        </Box>
    );
}

export default ProgressSpinner;