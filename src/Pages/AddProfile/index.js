import React, { useContext } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { ConnectServerUrl } from '../../utils/constants';
import { TextField, Typography, Button } from '@material-ui/core';
import { useStyles } from './styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ProfileContext from '../../components/ProfileContext';
import { tags } from './constants';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default function AddProfile() {
  const [profile, setProfile] = useContext(ProfileContext);

  const classes = useStyles();
  const userCookie = cookies.get('userCookie');
  const name = userCookie.Name;
  const email = userCookie.Email;
  const errors = {};

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          username: '',
          ccn: 0,
          github: '',
          linkedin: '',
          instagram: '',
          bio: '',
          tags: [],
        }}
        validate={(values) => {
          if (values.ccn < 0) errors.ccn = "Can't be negative";
          if (values.ccn > 20) errors.ccn = 'impossible';

          return errors;
        }}
        onSubmit={async (values) => {
          axios
            .post(`${ConnectServerUrl}/adduser`, {
              name: values.name,
              email,
              username: values.username,
              clubsNumber: values.ccn,
              bio: values.bio,
              gitHubUrl: values.github,
              linkedInUrl: values.linkedin,
              instaUrl: values.instagram,
              tags: values.tags,
            })
            .then(function (res) {
              console.log(res);
              if (res.data == 'username already taken') {
                errors.username = 'username already taken';
              }
              if (res.data == 'success') setProfile(true);
            })
            .catch(function (error) {
              console.log(error);
            });

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
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}

                //   defaultValue={name}
              />
              <br />
              <TextField
                size="small"
                required
                id="outlined-required"
                label="Username"
                variant="outlined"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              <Typography style={{ color: 'black' }}>
                {errors.username && touched.username && errors.username}
              </Typography>
              <Typography style={{ color: 'black', marginTop: '.5rem' }}>
                Clubs/Committees
              </Typography>
              <Autocomplete
                className={classes.input}
                name="tags"
                onChange={(event, value) => {
                  setFieldValue('tags', value !== null ? value : values.tags);
                }}
                onBlur={handleBlur}
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
                    name="tags"
                  />
                )}
              />
              <TextField
                label="Github profile link"
                id="filled-size-small"
                variant="filled"
                size="small"
                name="github"
                value={values.github}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                label="LinkedIn profile link"
                id="filled-size-small"
                variant="filled"
                size="small"
                name="linkedin"
                value={values.linkedin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                label="Instagram handle link"
                id="filled-size-small"
                variant="filled"
                size="small"
                name="instagram"
                value={values.instagram}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              \
              <br />
              <TextField
                id="outlined-multiline-flexible"
                label="BIO"
                multiline
                rowsMax={3}
                onChange={handleChange}
                variant="outlined"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '1rem' }}
              >
                Update Profile
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
