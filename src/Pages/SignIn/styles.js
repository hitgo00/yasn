import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://res.cloudinary.com/hitgo/image/upload/q_25/v1588514041/IMG_1871-min_bdi4sj.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imageS: {
    position: "relative",
    // backgroundImage:
    //   'url(https://res.cloudinary.com/hitgo/image/upload/v1588528057/Canva_-_Black_Coffee_Cup_and_Black_Notepad_on_Black_Table-min_h28trv.jpg)',
    // backgroundRepeat: 'no-repeat',
    backgroundColor: "#121212",
    background: "rgb(17,17,17)",
    background:
      "linear-gradient(180deg, rgba(17,17,17,1) 0%, rgba(18,18,18,1) 94%, rgba(79,81,82,1) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: "8em",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperCopy: {
    position: "absolute",
    left: "50%",
    top: "91%",
    transform: "translate(-50%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5496ff",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%)",
    borderRadius: "8px !important",
  },
  copyright: {
    color: "white",
  },
}));
