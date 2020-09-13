import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://res.cloudinary.com/hitgo/image/upload/q_25/v1588514041/IMG_1871-min_bdi4sj.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imageS: {
    backgroundImage:
      'url(https://res.cloudinary.com/hitgo/image/upload/v1588528057/Canva_-_Black_Coffee_Cup_and_Black_Notepad_on_Black_Table-min_h28trv.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: '8em',
    color: 'white',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%)',
  },
  copyright: {
    color: 'white',
    position: 'absolute',
    top: '90%',
  },
}));
