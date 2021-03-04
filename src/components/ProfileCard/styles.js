import { makeStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles(() => ({
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
    background: "rgb(32,96,153)",
    background:
      "linear-gradient(180deg, rgba(32,96,153,1) 0%, rgba(76,93,125,1) 82%, rgba(133,172,172,1) 100%)",
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
