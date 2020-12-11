import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import {
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
  Button,
  FormGroup,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./login.scss";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
  },
  inputField: {
    width: "400px",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [userName, set_userName] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    console.log("hi");
    event.preventDefault();

    dispatch(login(userName, values.password));

    set_userName("");
    setValues({ password: "", showPassword: false });
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div className="loginpage">
      <Typography variant="h2">Welcome back!</Typography>

      <FormGroup>
        <FormControl className={clsx(classes.margin, classes.inputField)}>
          <InputLabel htmlFor="input-with-icon-adornment" color="textPrimary">
            Username
          </InputLabel>
          <Input
            onChange={(event) => set_userName(event.target.value)}
            value={userName}
            type="text"
            placeholder="Enter username"
            id="input-with-icon-adornment"
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.inputField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            placeholder="Enter password"
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </FormGroup>
      <Button
        color="primary"
        type="submit"
        onClick={submitForm}
        variant="contained"
        className={classes.button}
      >
        Log in
      </Button>

      <Link to="/signup" style={{ textAlign: "center" }}>
        <Typography color="primary">Click here to sign up</Typography>
      </Link>
    </div>
  );
}
