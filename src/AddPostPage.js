import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// import Upload from "./components/Upload";

import { CloudName, UploadPreset } from "./constants";
const useStyles = makeStyles(() => ({
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
          `https://res.cloudinary.com/${CloudName}image/upload/c_crop,g_custom/v1/` +
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

  return (
    <div>
      <Card className={styles.card}>
        <CardContent>
          <h6 className={styles.heading}>Add a Post </h6>
          <Divider light />
          <AddPostMedia />

          <Divider light />

          <FormControl fullWidth>
            <TextField
              className={styles.input}
              id="standard-filled"
              label="Title"
              variant="filled"
            />

            <TextField
              className={styles.input}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={2}
              defaultValue=""
              variant="outlined"
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
                // defaultValue={[tags[3]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="AddTags"
                  />
                )}
              />
            </Box>
            <Button variant="contained" color="primary">
              Post
            </Button>
          </FormControl>
        </CardContent>
        <Divider light />
      </Card>
    </div>
  );
};

const tags = ["Project", "Artwork", "Writings", "Music", "Dance", "Other"];

export default AddPostPage;
