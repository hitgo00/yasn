import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      color: "black",

      width: "auto",
    },
    margin: "2rem",
    backgroundColor: "white",
    padding: "3rem",
  },
  heading: {
    color: "black",
    fontSize: "1.5rem",
  },
  input: {
    width: "auto",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
    background: "rgb(32,96,153)",
    background:
      "linear-gradient(180deg, rgba(32,96,153,1) 0%, rgba(76,93,125,1) 82%, rgba(133,172,172,1) 100%)",
  },
}));
