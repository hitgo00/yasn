import React from "react";

import UploadImage from "./components/UploadImage";

import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Upload from "./components/Upload";

import { Image, Transformation } from "cloudinary-react";

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
  const styles = useStyles();

  return (
    <div>
      <Card className={styles.card}>
        <CardContent>
          <h6 className={styles.heading}>Add a Post </h6>
          <Divider light />

          {/* <CardMedia
            className={styles.media}
            image="https://res.cloudinary.com/hitgo/image/upload/c_crop,g_custom/v1/daconnect/bdplmkbf1zlzhm96scda"
            title="AcadVault"
            
          /> */}
          {/* <video width="200" controls>
            <source
              type="video/mp4"
              data-reactid=".0.1.0.0.0"
              src="https://res.cloudinary.com/hitgo/video/upload/v1588194153/daconnect/ittpotar2fadsykerx4q"
            ></source>
          </video> */}
          <Upload
            element={<AddPhotoAlternateIcon />}
            text="Upload Image/Video"
          />

          <Divider light />
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Caption</InputLabel>
            <Input
              id="standard-adornment-amount"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="send" size="medium">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </CardContent>
        <Divider light />

        <Box display={"flex"}>
          <Autocomplete
            fullWidth
            multiple
            limitTags={1}
            id="multiple-limit-tags"
            options={tags}
            getOptionLabel={(option) => option}
            defaultValue={[tags[3]]}
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
        <br />
      </Card>
    </div>
  );
};

const tags = ["Project", "Artwork", "Writings", "Other"];

export default AddPostPage;
