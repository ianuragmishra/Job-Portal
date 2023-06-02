import { useContext, useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Typography,
    makeStyles,
    Paper,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
    body: {
        padding: "60px 60px",
    },
    inputBox: {
        width: "300px",
    },
    submitButton: {
        width: "300px",
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const setPopup = useContext(SetPopupContext);

    const [loggedin, setLoggedin] = useState(isAuth());

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const [inputErrorHandler, setInputErrorHandler] = useState({
        email: {
            error: false,
            message: "",
        },
        password: {
            error: false,
            message: "",
        },
    });

    const handleInput = (key, value) => {
        setLoginDetails({
            ...loginDetails,
            [key]: value,
        });
    };

    const handleInputError = (key, status, message) => {
        setInputErrorHandler({
            ...inputErrorHandler,
            [key]: {
                error: status,
                message: message,
            },
        });
    };

    const handleLogin = () => { };

    return loggedin ? (
        <Redirect to="/" />
    ) : (
        <Paper elevation={3} className={classes.body}>
            <Grid container direction="column" spacing={4} alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h2">
                        Login
                    </Typography>
                </Grid>
                <Grid item>
                    <EmailInput
                        label="Email"
                        value={loginDetails.email}
                        onChange={(event) => handleInput("email", event.target.value)}
                        inputErrorHandler={inputErrorHandler}
                        handleInputError={handleInputError}
                        className={classes.inputBox}
                    />
                </Grid>
                <Grid item>
                    <PasswordInput
                        label="Password"
                        value={loginDetails.password}
                        onChange={(event) => handleInput("password", event.target.value)}
                        className={classes.inputBox}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLogin()}
                        className={classes.submitButton}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Login;