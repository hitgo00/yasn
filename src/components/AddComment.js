import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import axios from "axios";
import { ConnectServerUrl } from "../constants";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Cookies } from "react-cookie";

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
  const email = cookies.get("userCookie").Email;
  let name, userId, username;

  return (
    <div>
      <div className={classes.margin}>
        <Formik
          initialValues={{
            comment: "",
          }}
          validate={() => {}}
          onSubmit={async (values) => {
            if (values.comment && props.userId) {
              axios
                .post(`${ConnectServerUrl}/addcomment`, {
                  comment: values.comment,
                  postId: props.postId,
                  username: props.username,
                  userId: props.userId,
                  name: props.name,
                })
                .then(function (res) {
                  console.log(res);

                  if (res.data === "success") {
                    console.log("comment added!");
                    window.location.reload();
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }

            console.log(JSON.stringify(values));
            //   setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,

            /* and other goodies */
          }) => (
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
