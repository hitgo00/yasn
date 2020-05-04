import React, { useEffect, useRef } from "react";
import GoogleLogin from "react-google-login";

import { ConnectServerUrl } from "./constants";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import GoogleButton from "react-google-button";

import GsignIn from "./GsignIn";

import "./common.scss";

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/hitgo00/yasn">
        YASN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://res.cloudinary.com/hitgo/image/upload/v1588514041/IMG_1871-min_bdi4sj.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imageS: {
    backgroundImage:
      "url(https://res.cloudinary.com/hitgo/image/upload/v1588528057/Canva_-_Black_Coffee_Cup_and_Black_Notepad_on_Black_Table-min_h28trv.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: "8em",
    color: "white",
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%)",
  },
  copyright: {
    color: "white",
    position: "absolute",
    top: "90%",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  console.log(sessionStorage);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.imageS}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <DonutSmallIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connect
          </Typography>
          <br />
          <Typography component="h3" variant="h6">
            <i>It's exclusive!</i>
          </Typography>
          <br />

          {/* <a href={`${ConnectServerUrl}/auth/google`}> */}
          <GsignIn
            element={
              <GoogleButton
                type="dark"
                className={classes.submit}
                onClick={() => {
                  console.log("Google button clicked");
                }}
              />
            }
          />
          {/* <GoogleButton
            ref="googleLoginBtn"
            type="dark"
            className={classes.submit}
            onClick={() => {
              console.log("Google button clicked");
            }}
          /> */}
          {/* </a> */}
          <br />
          <Typography component="h5" variant="h6">
            <i>using @daiict.ac.in email.</i>
          </Typography>
          {/* <Typography component="h1" variant="h6">
            It's an exclusive Social Network for DA, you can login only with
            @daiict.ac.in email address
          </Typography> */}
          <Box mt={5} className={classes.copyright}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
