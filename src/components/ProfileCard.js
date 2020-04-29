import React from "react";

import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
// import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
// import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EditIcon from "@material-ui/icons/Edit";
const useStyles = makeStyles(() => ({
  card: {
    // position: "absolute",
    marginTop: "0.5rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    paddingLeft: "3.5rem",
    paddingRight: "3.5rem",
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
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
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
}));

const ProfileCard = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardContent>
        <Avatar className={styles.avatar} src={"https://i.pravatar.cc/300"} />
        <h3 className={styles.heading}>Alan Podemski</h3>
        <span className={styles.subheader}>
          201801052 <br /> BIO
        </span>
        <Box display={"flex"}>
          <Box flex={"auto"} p={2}>
            <InstagramIcon />
          </Box>
          <Box flex={"auto"} p={2}>
            <GitHubIcon />
          </Box>
          <Box flex={"auto"} p={2}>
            <LinkedInIcon />
          </Box>
        </Box>

        <EditIcon fontSize="small" />
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box
          p={2}
          flex={"auto"}
          // className={borderedGridStyles.item}
        >
          <p className={styles.statLabel}>Posts</p>
          <p className={styles.statValue}>2</p>
        </Box>
        {/* <Box
          p={2}
          flex={"auto"}
          // className={borderedGridStyles.item}
        >
          <p className={styles.statLabel}>Following</p>
          <p className={styles.statValue}>12</p>
        </Box> */}
        <Box p={2} flex={"auto"}>
          <p className={styles.statLabel}>Clubs/Comm</p>
          <p className={styles.statValue}>7</p>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileCard;
