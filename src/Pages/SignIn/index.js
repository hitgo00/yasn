import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Paper,
  Link,
  CssBaseline,
  Avatar,
} from '@material-ui/core';
import GoogleButton from 'react-google-button';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import { useStyles } from './styles';
import './styles.scss';
import GsignIn from '../../components/GsignIn';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/hitgo00/yasn">
        YASN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const classes = useStyles();

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

          <GsignIn
            element={
              <GoogleButton
                type="dark"
                className={classes.submit}
                onClick={() => {
                  console.log('Google button clicked');
                }}
              />
            }
          />

          <br />
          <Typography component="h5" variant="h6">
            <i>using @daiict.ac.in email.</i>
          </Typography>

          <Box mt={5} className={classes.copyright}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
