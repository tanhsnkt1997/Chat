import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.down("sm")]: {
      width: "35px",
      height: "35px",
      margin: "0px 5px",
    },
    [theme.breakpoints.up("md")]: {
      width: "40px",
      height: "40px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50px",
      height: "50px",
    },
  },
  name: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
      fontSize: "0.8rem",
      margin: "0px 5px",
    },
    [theme.breakpoints.up("lg")]: {
      display: "block",
      fontSize: "1rem",
      margin: "0px 10px",
    },
  },
}));
