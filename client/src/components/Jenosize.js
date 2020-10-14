import React, { useState, useEffect, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Rating from "@material-ui/lab/Rating";
import ReactJson from "react-json-view";
import JenosizeDataService from "../services/JenosizeDataService";
import GoogleMapsPlacesAutocomplete from "./GoogleMapsPlacesAutocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Jenosize() {
  const classes = useStyles();
  const [placeId, setPlaceId] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [googleKey] = useState(""); // Not use now please set in client
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (placeId && sessionToken) {
      setLoading(true);
      getNearbyRestaruants();
    }
  }, [placeId, sessionToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchPlaceChange = (place, sessionToken) => {
    if (place && sessionToken) {
      setPlaceId(place.place_id);
      setSessionToken(sessionToken);
    }
  };

  const getNearbyRestaruants = () => {
    JenosizeDataService.getNearbyRestaruants(placeId, sessionToken, googleKey)
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Restaurant Nearby
            </Typography>
            <Paper component="form" className={classes.root}>
              <GoogleMapsPlacesAutocomplete
                onChange={handleSearchPlaceChange}
                googleKey={googleKey}
              />
            </Paper>{" "}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography variant="h5" color="inherit" noWrap>
            Result :
          </Typography>
          <Fade in={loading}>
            <LinearProgress />
          </Fade>
          <Grid container spacing={4}>
            {restaurants.map((restaurant) => (
              <Grid item key={restaurant.place_id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Avatar alt="Remy Sharp" src={restaurant.icon} />
                    <Typography gutterBottom variant="h5" component="h2">
                      {restaurant.name}
                    </Typography>
                    <Typography>{restaurant.vicinity}</Typography>
                  </CardContent>
                  <CardContent>
                    <Rating
                      name="read-only"
                      value={restaurant.rating}
                      readOnly
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography variant="h5" color="inherit" noWrap>
            Json Result :
          </Typography>
          <ReactJson src={restaurants} theme="monokai" />
        </Container>
      </main>
    </Fragment>
  );
}
