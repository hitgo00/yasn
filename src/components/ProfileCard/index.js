import React from 'react';
import { useStyles } from './styles';
import { Box, Card, CardContent, Avatar, Divider } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EditIcon from '@material-ui/icons/Edit';

const ProfileCard = (props) => {
  const styles = useStyles();
  const { name, clubs, roll, bio, posts, github, linkedin, instagram } = props;

  return (
    <Card className={styles.card}>
      <CardContent>
        <Avatar
          className={styles.avatar}
          //  src={"https://i.pravatar.cc/300"}
        >
          {name
            ? name[0]
            : // + name.split(" ")[1][0]
              'X'}
        </Avatar>

        <h3 className={styles.heading}>{name}</h3>
        <span className={styles.subheader}>
          {roll.substring(0, 6)}XXX <br /> {bio}
        </span>

        <Box display={'flex'}>
          {instagram ? (
            <Box flex={'auto'} p={2}>
              <a target="_blank" href={instagram}>
                <InstagramIcon />
              </a>
            </Box>
          ) : null}
          {github ? (
            <Box flex={'auto'} p={2}>
              <a target="_blank" href={github}>
                <GitHubIcon />
              </a>
            </Box>
          ) : null}
          {linkedin ? (
            <Box flex={'auto'} p={2}>
              <a target="_blank" href={linkedin}>
                <LinkedInIcon style={{ link: { color: 'black' } }} />
              </a>
            </Box>
          ) : null}
        </Box>

        {/* <EditIcon fontSize="small" /> */}
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box
          p={2}
          flex={'auto'}
          // className={borderedGridStyles.item}
        >
          <p className={styles.statLabel}>Posts</p>
          <p className={styles.statValue}>{posts ? posts.length : 0}</p>
        </Box>

        <Box p={2} flex={'auto'}>
          <p className={styles.statLabel}>Clubs/Comm</p>
          <p className={styles.statValue}>{clubs ? clubs : 0}</p>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileCard;
