import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import Container from "react-bootstrap/Container";

import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import {
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./signup.scss";

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
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
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
    event.preventDefault();

    dispatch(signUp(firstName, lastName, username, email, values.password));

    set_firstName("");
    set_lastName("");
    set_username("");
    set_email("");
    setValues({ password: "", showPassword: false });
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div className="signuppage">
      <Typography variant="h2">Sign up to get started!</Typography>

      <FormGroup>
        <FormControl className={clsx(classes.margin, classes.inputField)}>
          <InputLabel>First name</InputLabel>
          <Input
            onChange={(event) => set_firstName(event.target.value)}
            value={firstName}
            type="text"
            placeholder="Enter your first name"
            required
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.inputField)}>
          <InputLabel>Last name</InputLabel>
          <Input
            onChange={(event) => set_lastName(event.target.value)}
            value={lastName}
            type="text"
            placeholder="Enter last name"
            required
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.inputField)}>
          <InputLabel>Username</InputLabel>
          <Input
            value={username}
            onChange={(event) => set_username(event.target.value)}
            type="text"
            placeholder="Enter user name"
            required
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.inputField)}>
          <InputLabel>Email address</InputLabel>
          <Input
            value={email}
            onChange={(event) => set_email(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
            helperText="We'll never share your email with anyone else"
          />
        </FormControl>
      </FormGroup>
      <FormControl className={clsx(classes.margin, classes.inputField)}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
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

      <Button
        color="primary"
        type="submit"
        onClick={submitForm}
        variant="contained"
        className={classes.button}
      >
        Sign up
      </Button>

      <Link to="/login" style={{ textAlign: "center", textDecoration: "none" }}>
        <Typography color="primary">Click here to log in</Typography>
      </Link>
    </div>
  );
}
