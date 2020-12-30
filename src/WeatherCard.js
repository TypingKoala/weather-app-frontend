import { Button, Card, CardActions, CardContent, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, Typography } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 20
  },
  form: {
    padding: theme.spacing(2)
  }
}));

// A weather card that allows user to input a new zip code
function ZipCard(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
      <Typography color="textSecondary" className={classes.title}>
        Enter a new ZIP Code
      </Typography>
      <form 
        className={classes.form} 
        onSubmit={(evt) => {
          evt.preventDefault();
          props.submitZipCode();
        }}
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="zipcode">ZIP Code</InputLabel>
          <Input 
            id="zipcode"
            value={props.zipCode}
            onChange={props.handleZipCodeChange}
            autoFocus={true}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="submit" onClick={props.submitZipCode}>
                  <ArrowForward />
                </IconButton>
              </InputAdornment>
            } />
        </FormControl>
      </form>
      </CardContent>
    </Card>
  )
}

ZipCard.propTypes = {
  zipCode: PropTypes.string.isRequired,
  handleZipCodeChange: PropTypes.func.isRequired,
  submitZipCode: PropTypes.func.isRequired
}

// A weather card that allows user to input a new zip code
function WeatherCard({ zipcode }) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
      <Typography color="textSecondary" className={classes.title}>
        {`Weather in ${zipcode}`}
      </Typography>
      <img src="https://openweathermap.org/img/wn/02d@4x.png" alt="weather condition" />
      
      <Typography variant="subtitle1">
        {`Temperature: 80 F`}
        <br />
        {`Humidity: 60%`}
        <br />
        {`Conditions: Cloudy`}
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  )
}

export { WeatherCard, ZipCard };