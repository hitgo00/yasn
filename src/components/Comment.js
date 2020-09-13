import React from 'react';
import { Link } from '@reach/router';
import Moment from 'react-moment';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Comment(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.demo}>
          <List>
            {/* {generate( */}
            <ListItem>
              <ListItemAvatar>
                {props.username ? (
                  <Link to={`/${props.username}`}>
                    <Avatar className={classes.avatar}>
                      {props.name
                        ? props.name[0]
                        : // + props.name.split(" ")[1][0]
                          'X'}
                    </Avatar>
                  </Link>
                ) : (
                  <Avatar className={classes.avatar}>
                    {props.name
                      ? props.name[0]
                      : // + props.name.split(" ")[1][0]
                        'X'}
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={props.comment}
                secondary={
                  <Moment format="MMM D" withTitle>
                    {props.date}
                  </Moment>
                }
              />
              <ListItemSecondaryAction>
                {/* <IconButton edge="end" aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton> */}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </Grid>
    </div>
  );
}
