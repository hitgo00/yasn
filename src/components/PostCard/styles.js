import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '28vw',
    maxWidth: 400,
    Width: '89vw',
    [theme.breakpoints.down('sm')]: {
      minWidth: '88vw',

      // width: "auto",
    },

    marginTop: 20,
    // margin: "1rem",
    align: 'center',
  },
  media: {
    height: 0,
    paddingBottom: '55.25%', // 16:9
    paddingTop: '42.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
