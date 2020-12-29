import { Button, Card, CardActions, CardContent, makeStyles, TextField, Typography } from "@material-ui/core";

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
function ZipCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
      <Typography color="textSecondary" className={classes.title}>
        Enter a new ZIP Code
      </Typography>
      <form className={classes.form}>
        <TextField id="zip" label="Zip" />
      </form>
      </CardContent>
    </Card>
  )
}

// A weather card that allows user to input a new zip code
function WeatherCard({ data }) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
      <Typography color="textSecondary" className={classes.title}>
        {`Weather in ${data.city}`}
      </Typography>
      <img src="https://openweathermap.org/img/wn/02d@4x.png" alt="weather condition" />
      
      <Typography variant="subtitle1">
        {`Temperature: ${data.temperature}`}
        <br />
        {`Humidity: ${data.humidity}`}
        <br />
        {`Conditions: ${data.conditions}`}
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