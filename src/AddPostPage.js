import React, { useState, useEffect } from "react";
import { Router, Redirect, Link } from "@reach/router";
import { Formik } from "formik";
import axios from "axios";
import { ConnectServerUrl } from "./constants";
import queryString from "query-string";

import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { Cookies } from "react-cookie";

// import Upload from "./components/Upload";

import { CloudName, UploadPreset } from "./constants";

const cookies = new Cookies();
const email = cookies.get("userCookie").Email;

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      color: "black",

      width: "auto",
    },
    margin: "2rem",
    // backgroundColor: "white",
    padding: "3rem",
  },
  card: {
    // position: "absolute",
    marginTop: "0",
    marginLeft: "1rem",
    marginRight: "1rem",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
    borderRadius: 12,
    maxWidth: 345,
    Width: "auto",

    textAlign: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  heading: {
    fontSize: "1rem",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 4,
    marginBottom: 7,
  },
  input: {
    marginTop: 4,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "black",
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 12,
    color: "black",
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
}));

const AddPostPage = () => {
  const [Media, SetMedia] = useState("upload");
  const [ImageUrl, SetImageUrl] = useState("");
  const [VideoUrl, SetVideoUrl] = useState("");

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
    console.log(props.ImageUrl);
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
        folder: "daconnect",
        clientAllowedFormats: ["png", "jpeg", "mp4", "mov", "heic"],
        maxFileSize: 7000000,
        maxImageFileSize: 3500000,
        maxVideoFileSize: 40000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        sources: ["local", "instagram", "facebook"],
      },
      (err, res) => {
        if (err) console.log(err);
        if (res.event === "success") {
          if (res.info.resource_type === "image") {
            SetImageUrl(res.info.public_id);
            SetMedia("image");
          } else {
            SetVideoUrl(res.info.public_id);
            SetMedia("video");
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
    if (Media === "image") return <UImage ImageUrl={ImageUrl} />;
    else if (Media === "video") return <Video videoUrl={VideoUrl} />;
    else
      return (
        <Upload element={<AddPhotoAlternateIcon />} text="Upload Image/Video" />
      );
  };

  const [postSuccess, setPostSuccess] = useState(false);

  return (
    <div>
      {postSuccess ? (
        <div className={styles.root}>
          <Link to="/">
            <Typography>Post added successfully!</Typography>
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
                  title: "",
                  description: "",
                  tags: [],
                }}
                validate={(values) => {
                  const errors = {};
                  if (values.title === "")
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
                          title: values.title,
                          tags: values.tags,
                          description: values.description,

                          imageUrl: ImageUrl,
                          videoUrl: VideoUrl,
                        }
                      )
                      .then(function (res) {
                        console.log(res);

                        if (res.data == "successfully added post")
                          setPostSuccess(true);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }

                  console.log(JSON.stringify(values));
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
                      <Typography style={{ color: "black" }}>
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
                      <Box display={"flex"}>
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
                            console.log(value);
                            setFieldValue(
                              "tags",
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

const tags = ["Project", "Artwork", "Writings", "Music", "Dance", "Other"];

export default AddPostPage;
