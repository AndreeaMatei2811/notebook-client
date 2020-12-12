import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import "./Landingpage.scss";
import notebookimage from "./IMG_0197.PNG";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function Landingpage() {
  const history = useHistory();

  return (
    <Grid container className="landingpage" alignContent="center">
      <Grid item md={2}></Grid>
      <Grid item md={4}>
        <Typography color="primary" variant="h1" align="left">
          Your perfect Notebook..
        </Typography>
        <Typography variant="subtitle1" align="left">
          Get started and never lose your notes again!
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          component={RouterLink}
          to="/signup"
          style={{ margin: "10px 10px 0px 0px" }}
        >
          Sign Up
        </Button>
        <Button
          color="primary"
          variant="contained"
          component={RouterLink}
          to="/login"
          style={{ margin: "10px 10px 0px 0px" }}
        >
          Log In
        </Button>
      </Grid>
      <Grid item md={4}>
        <img src={notebookimage} alt="notebook" width="400px" />
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}
