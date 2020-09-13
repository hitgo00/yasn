import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      color: 'black',

      width: 'auto',
    },
    margin: '2rem',
    backgroundColor: 'white',
    padding: '3rem',
  },
  heading: {
    color: 'black',
    fontSize: '1.5rem',
  },
  input: {
    width: 'auto',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
    backgroundColor: red[500],
  },
}));
