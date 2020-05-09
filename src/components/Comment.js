import React from "react";
import { Link } from "@reach/router";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

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
                <Link to={`/${props.username}`}>
                  <Avatar className={classes.avatar}>
                    {props.name
                      ? props.name[0] + props.name.split(" ")[1][0]
                      : "X"}
                  </Avatar>
                </Link>
              </ListItemAvatar>
              <ListItemText primary={props.comment} secondary={"2w"} />
              <ListItemSecondaryAction>
                {/* <IconButton edge="end" aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton> */}
              </ListItemSecondaryAction>
            </ListItem>
            {/* )} */}
          </List>
        </div>
      </Grid>
    </div>
  );
}
