import React, { Fragment } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Routing from "./routes";
import './App.css'

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Jenosize Test
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/"
              className={classes.link}
            >
              Restaurants Nearby
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/game24"
              className={classes.link}
            >
              Game 24
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/gamexo"
              className={classes.link}
            >
              Game XO
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Routing />
    </Fragment>
  );
}

export default App;
