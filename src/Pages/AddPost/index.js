import React, { useState } from 'react';
import { Link } from '@reach/router';
import { Formik } from 'formik';
import axios from 'axios';
import queryString from 'query-string';
import { useStyles } from './styles';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  TextField,
  FormControl,
} from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cookies } from 'react-cookie';
import {
  CloudName,
  UploadPreset,
  ConnectServerUrl,
} from '../../utils/constants';

const cookies = new Cookies();
const email = cookies.get('userCookie').Email;

const AddPostPage = () => {
  const [Media, SetMedia] = useState('upload');
  const [ImageUrl, SetImageUrl] = useState('');
  const [VideoUrl, SetVideoUrl] = useState('');
  const styles = useStyles();

  const Video = (props) => {
    return (
      <video width="200" controls>
        <source
          type="video/mp4"
          data-reactid=".0.1.0.0.0"
          src={
            `https://res.cloudinary.com/${CloudName}/video/upload/v1588194153/` +
            props.videoUrl
          }
        ></source>
      </video>
    );
  };

  const UImage = (props) => {
    return (
      <CardMedia
        className={styles.media}
        image={
          `https://res.cloudinary.com/${CloudName}/image/upload/c_crop,g_custom/v1/` +
          props.ImageUrl
        }
        title="AcadVault"
      />
    );
  };

  function Upload(props) {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CloudName,
        uploadPreset: UploadPreset,
        multiple: false,
        cropping: true,
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        folder: 'daconnect',
        clientAllowedFormats: ['png', 'jpeg', 'mp4', 'mov', 'heic'],
        maxFileSize: 7000000,
        maxImageFileSize: 3500000,
        maxVideoFileSize: 40000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        sources: ['local', 'instagram', 'facebook'],
      },
      (err, res) => {
        if (err) console.log(err);
        if (res.event === 'success') {
          if (res.info.resource_type === 'image') {
            SetImageUrl(res.info.public_id);
            SetMedia('image');
          } else {
            SetVideoUrl(res.info.public_id);
            SetMedia('video');
          }
        }
      }
    );

    const showWidget = () => {
      widget.open();
    };

    return (
      <div>
        <button onClick={showWidget}>
          {props.element} <br />
          {props.text}
        </button>
      </div>
    );
  }

  const AddPostMedia = () => {
    if (Media === 'image') return <UImage ImageUrl={ImageUrl} />;
    else if (Media === 'video') return <Video videoUrl={VideoUrl} />;
    else
      return (
        <Upload
          element={<AddPhotoAlternateIcon />}
          text="Upload Image/Video (required)"
        />
      );
  };

  const [postSuccess, setPostSuccess] = useState(false);

  return (
    <div>
      {postSuccess ? (
        <div className={styles.root}>
          <Link to="/">
            <Typography>Post added successfully! 🔥</Typography>
            <br />
            <CheckCircleIcon fontSize="large" />
          </Link>
        </div>
      ) : (
        <>
          <Card className={styles.card}>
            <CardContent>
              <h6 className={styles.heading}>Add a Post </h6>
              <Divider light />
              <AddPostMedia />

              <Divider light />
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                  tags: [],
                }}
                validate={(values) => {
                  const errors = {};
                  if (values.title === '')
                    errors.title = "Title can't be blank";

                  return errors;
                }}
                onSubmit={async (values) => {
                  if (VideoUrl || ImageUrl) {
                    axios
                      .post(
                        `${ConnectServerUrl}/addpost?` +
                          queryString.stringify({ email }),
                        {
                          currentUserId: cookies.get('userDetails')._id,
                          title: values.title,
                          tags: values.tags,
                          description: values.description,

                          imageUrl: ImageUrl,
                          videoUrl: VideoUrl,
                        }
                      )
                      .then(function (res) {
                        if (res.data === 'successfully added post')
                          setPostSuccess(true);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }
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
                  <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        className={styles.input}
                        id="standard-filled"
                        label="Title"
                        variant="filled"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Typography style={{ color: 'black' }}>
                        {errors.title && touched.title && errors.title}
                      </Typography>
                      <TextField
                        className={styles.input}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={2}
                        variant="outlined"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Divider light />
                      <Box display={'flex'}>
                        <Autocomplete
                          className={styles.input}
                          fullWidth
                          multiple
                          limitTags={1}
                          id="multiple-limit-tags"
                          options={tags}
                          getOptionLabel={(option) => option}
                          name="tags"
                          onChange={(e, value) => {
                            setFieldValue(
                              'tags',
                              value !== null ? value : values.tags
                            );
                          }}
                          // value={values.tags}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Tags"
                              placeholder="AddTags"
                              name="tags"
                            />
                          )}
                        />
                      </Box>

                      <Button type="submit" variant="contained" color="primary">
                        Post
                      </Button>
                    </FormControl>
                  </form>
                )}
              </Formik>
            </CardContent>
            <Divider light />
          </Card>
        </>
      )}
    </div>
  );
};

const tags = ['Project', 'Artwork', 'Writings', 'Music', 'Dance', 'Other'];

export default AddPostPage;
