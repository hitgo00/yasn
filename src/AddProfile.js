import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),

      width: "auto",
    },
    margin: "2rem",
    backgroundColor: "white",
    padding: "3rem",
  },
  heading: {
    marginBottom: "1rem",
    color: "black",
    fontSize: "1.5rem",
  },
  input: {
    width: "auto",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
    backgroundColor: red[500],
  },
}));

export default function AddProfile() {
  const classes = useStyles();

  const tags = [
    "DSC",
    "DADC",
    "Music Club",
    "Press Club",
    "Headrush",
    "DTG",
    "MSTC",
    "SPC",
    "CMC",
    "HMC",
    "Sports Comm",
    "ICT Comm",
    "Acad Comm",
    "Radio Club",
    "Khelaiya Club",
    "Synapse Comm",
    "Cultural Comm",
    "Debate Club",
    "Research Club",
    "Sambhav",
    "Programming Club",
    "Research Club",
    "IEEE SB",
    "EHC",
    "Cubing Club",
    "PMMC",
    "Heritage club",
  ];

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
            <Typography className={classes.heading}>
              Complete your profile to <i>Connect</i> !
            </Typography>
            <div>
              {/* <Avatar
                className={classes.avatar}
                // src={"https://i.pravatar.cc/300"}
              >
                HG
              </Avatar> */}
              <TextField
                size="small"
                required
                variant="outlined"
                id="outlined-required"
                label="Name"
                defaultValue="Hitesh Goyal"
              />
              <br />
              <TextField
                size="small"
                required
                id="outlined-required"
                label="Username"
                defaultValue=""
                variant="outlined"
              />
              <Typography style={{ color: "black", marginTop: ".5rem" }}>
                Clubs/Committees
              </Typography>
              <Autocomplete
                className={classes.input}
                // fullWidth
                multiple
                // limitTags={1}
                id="multiple-limit-tags"
                options={tags}
                getOptionLabel={(option) => option}
                // defaultValue={[tags[3]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    label=""
                    placeholder="Add"
                  />
                )}
              />
              <TextField
                label="Github link"
                id="filled-size-small"
                defaultValue=""
                variant="filled"
                size="small"
              />
              <TextField
                label="LinkedIn link"
                id="filled-size-small"
                defaultValue=""
                variant="filled"
                size="small"
              />
              <TextField
                label="Instagram link"
                id="filled-size-small"
                defaultValue=""
                variant="filled"
                size="small"
              />
              \
              <br />
              <TextField
                id="outlined-multiline-flexible"
                label="BIO"
                multiline
                rowsMax={4}
                // value={value}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
