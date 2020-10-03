import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import axios from 'axios';
import queryString from 'query-string';
import { ConnectServerUrl } from '../utils/constants';
import {
  IconButton,
  InputLabel,
  Input,
  FormControl,
  InputAdornment,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { Cookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  comment: {
    maxWidth: 345,
  },
}));

export default function InputWithIcon(props) {
  const classes = useStyles();
  const cookies = new Cookies();
  const email = cookies.get('userCookie').Email;
  const googleToken = cookies.get('userCookie').Token;

  return (
    <div>
      <div className={classes.margin}>
        <Formik
          initialValues={{
            comment: '',
          }}
          validate={() => {}}
          onSubmit={async (values) => {
            if (values.comment && props.userId) {
              axios
                .post(
                  `${ConnectServerUrl}/addcomment?` +
                    queryString.stringify(
                      { googleToken, email },
                      { withCredentials: true }
                    ),
                  {
                    comment: values.comment,
                    postId: props.postId,
                    username: props.username,
                    userId: props.userId,
                    name: props.name,
                  }
                )
                .then(function (res) {
                  if (res.data === 'success') {
                    console.log('comment added!');
                    window.location.reload();
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.root}>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Add a comment
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="send" size="medium" type="submit">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
