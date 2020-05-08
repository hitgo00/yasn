import React from "react";
import Moment from "react-moment";
import { Link } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 355,
    Width: "90vw",
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
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          <video width="300" height="300" controls>
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
        {/* <IconButton aria-label="add to favorites"> */}
        <ToggleButton
          value="like"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <FavoriteIcon />
        </ToggleButton>
        {` `}
        {/* <Typography> 22</Typography> */}
        {/* </IconButton> */}
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
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
