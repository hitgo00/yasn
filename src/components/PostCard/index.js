import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from '@reach/router';
import axios from 'axios';
import './styles.scss';
import queryString from 'query-string';
import Linkify from 'react-linkify';

import { useStyles } from './styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';

import AddComment from '../AddComment';
import Comment from '../Comment';
import { CloudName, ConnectServerUrl } from '../../utils/constants';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const email = cookies.get('userCookie').Email;
const googleToken = cookies.get('userCookie').Token;
let name, userId, username;

export default function PostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.likers.length);
  const comments = props.comments;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (cookies.get('userDetails')) {
      name = cookies.get('userDetails').name;
      userId = cookies.get('userDetails')._id;
      username = cookies.get('userDetails').username;
    }
    if (props.likes.likers.find((e) => e === userId)) setSelected(true);
  }, []);

  const handleLike = (selected) => {
    let liked = !selected;

    axios
      .post(
        `${ConnectServerUrl}/handlelike?` +
          queryString.stringify({ _id: props._id, email, googleToken }),
        {
          currentUserId: cookies.get('userDetails')._id,
          email,
          liked,
          //liked is true if user like , false if unliked ;
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Card className="card" className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/${props.creator.username}`}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.creator
                ? props.creator.name
                  ? props.creator.name[0]
                  : // + props.creator.name.split(" ")[1][0]
                    props.Name[0]
                : // + props.Name.split(" ")[1][0]
                props.Name
                ? props.Name
                : 'X'}
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
        <Typography
          className="desc"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <Linkify properties={{ target: '_blank' }}>
            {props.description ? props.description : ''}
          </Linkify>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box display={'flex'}>
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
            <Typography style={{ fontSize: '1.15rem' }}>
              {' '}
              {likeCount}
            </Typography>
          </Box>
          <Box display={'flex'}>
            <IconButton aria-label="share">
              <CommentIcon />
            </IconButton>
            <Typography style={{ fontSize: '1.15rem', marginTop: '.5rem' }}>
              {' '}
              {props.comments.length}
            </Typography>
          </Box>
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
          <Typography variant="h6" className={classes.title}>
            Comments
          </Typography>
          <AddComment
            name={name}
            postId={props._id}
            userId={userId}
            username={username}
          />

          {comments
            ? comments.map((comment) => (
                <Comment
                  {...comment}
                  key={comment.date}
                  // onClick={handleComments}
                />
              ))
            : null}
        </CardContent>
      </Collapse>
    </Card>
  );
}
