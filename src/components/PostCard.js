import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Link } from "@reach/router";
import axios from "axios";
import queryString from "query-string";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ToggleButton from "@material-ui/lab/ToggleButton";

import AddComment from "./AddComment";
import Comment from "./Comment";

import { CloudName, UploadPreset, ConnectServerUrl } from "../constants";

import { Cookies } from "react-cookie";

const cookies = new Cookies();
const email = cookies.get("userCookie").Email;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 355,
    Width: "89vw",
    marginTop: 20,
    // margin: "1rem",
    align: "center",
  },
  media: {
    height: 0,

    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.likers.length);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (props.likes.likers.find((e) => e === cookies.get("userId")))
      setSelected(true);
  }, []);
  const handleLike = (selected) => {
    let liked = !selected;

    axios
      .post(
        `${ConnectServerUrl}/handlelike?` +
          queryString.stringify({ _id: props._id }),
        {
          currentUserId: cookies.get("userId"),
          email,
          liked,
          //liked is true if user like , false if unliked ;
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/${props.creator.username}`}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.creator
                ? props.creator.name
                  ? props.creator.name[0] + props.creator.name.split(" ")[1][0]
                  : props.Name[0] + props.Name.split(" ")[1][0]
                : props.Name
                ? props.Name
                : "X"}
            </Avatar>
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={
          <Moment format="MMM D, YYYY" withTitle>
            {props.date}
          </Moment>
        }
      />
      {props.imageUrl ? (
        <>
          <CardMedia
            className={classes.media}
            image={
              `https://res.cloudinary.com/${CloudName}/image/upload/c_crop,g_custom/v1/` +
              props.imageUrl
            }
            title="AcadVault"
          />
        </>
      ) : (
        <>
          <video width="300" height="200" controls>
            <source
              type="video/mp4"
              data-reactid=".0.1.0.0.0"
              src={
                `https://res.cloudinary.com/${CloudName}/video/upload/q_auto/v1588194153/` +
                props.videoUrl
              }
            ></source>
          </video>
        </>
      )}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description ? props.description : ""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box display={"flex"}>
          <Box>
            <ToggleButton
              value="like"
              selected={selected}
              onChange={() => {
                handleLike(selected);
                selected
                  ? setLikeCount(likeCount - 1)
                  : setLikeCount(likeCount + 1);
                setSelected(!selected);
              }}
            >
              {selected ? (
                <FavoriteIcon fontSize="small" color="secondary" />
              ) : (
                <FavoriteIcon fontSize="small" />
              )}
            </ToggleButton>
          </Box>
          {`   `}
          <span> </span>
          {`   `}
          <Box l={3} p={1} b={4}>
            <Typography style={{ fontSize: "1.15rem" }}>
              {" "}
              {likeCount}
            </Typography>
          </Box>
          <Box display={"flex"}>
            <IconButton aria-label="share">
              <CommentIcon />
            </IconButton>
            <Typography style={{ fontSize: "1.15rem", marginTop: ".5rem" }}>
              {" "}
              {props.comments.length}
            </Typography>
          </Box>
          {/* <Box l={0} p={1} b={0}> */}
          {/* <Typography style={{ fontSize: "1.25rem" }}>
            {" "}
            {props.comments.length}
          </Typography> */}
          {/* </Box> */}
        </Box>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <AddComment />

          <Comment />
        </CardContent>
      </Collapse>
    </Card>
  );
}
