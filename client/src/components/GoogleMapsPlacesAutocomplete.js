import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { v4 as uuidv4 } from "uuid";
import JenosizeDataService from "../services/JenosizeDataService";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function GoogleMapsPlacesAutocomplete(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [sessionToken, setSessionToken] = React.useState(null);

  const fetch = React.useMemo(
    () =>
      throttle((keyword, active, value, sessionToken) => {
        JenosizeDataService.getAutocomplete(keyword, sessionToken, props.googleKey)
          .then((response) => {
            if (active) {
              let newOptions = [];

              if (value) {
                newOptions = [value];
              }

              if (response.data) {
                newOptions = [...newOptions, ...response.data];
              }
              setOptions(newOptions);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }, 200),
    [props.googleKey]
  ); 

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, active, value, sessionToken);

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, sessionToken]);
  
  return (
    <Autocomplete
      id="google-map"
      style={{ width: "100%" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        props.onChange(newValue, sessionToken);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onFocus={() => {
        setSessionToken(uuidv4());
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="ค้นหาเมืองที่ต้องการ"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
