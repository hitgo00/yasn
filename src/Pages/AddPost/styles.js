import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      color: 'black',

      width: 'auto',
    },
    margin: '2rem',
    // backgroundColor: "white",
    padding: '3rem',
  },
  card: {
    // position: "absolute",
    marginTop: '0',
    marginLeft: '1rem',
    marginRight: '1rem',
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    borderRadius: 12,
    maxWidth: 345,
    Width: 'auto',

    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: '1rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 4,
    marginBottom: 7,
  },
  input: {
    marginTop: 4,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: 'black',
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: 'black',
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
}));
