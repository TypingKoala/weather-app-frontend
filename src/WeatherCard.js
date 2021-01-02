import React from 'react';
import { Button, Card, CardActions, CardContent, createMuiTheme, Typography, withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import ContentLoader from "react-content-loader"

const theme = createMuiTheme();
const styles = {
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
  },
  weatherImg: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  card: {
    backgroundColor: "#c2dcff"
  }
};

// A weather card that allows user to input a new zip code
class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      city: null,
      conditions: null,
      temperature: null,
      humidity: null,
      windSpeed: null,
      windDegree: null,
      imgURL: null
    }
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather() {
    const params = new URLSearchParams({ zipcode: this.props.zipCode });
    fetch(process.env.REACT_APP_API_ENDPOINT + "/weather?" + params)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) throw Error(data.error);
        this.setState({
          loaded: true, // disable content-loader
          city: data.city,
          conditions: data.conditions,
          temperature: data.temperature,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          windDegree: data.windDegree,
          imgURL: data.imgURL
        })
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchWeather();
  }

  render() {
    const { classes } = this.props;
    if (!this.state.loaded) {
      return (
        <Card className={classes.card}>
          <ContentLoader 
            speed={2}
            width={300}
            height={450}
            viewBox="0 0 300 450"
            backgroundColor="#c2dcff"
            foregroundColor="#adc2de"
          >
            <rect x="0" y="55" rx="0" ry="0" width="300" height="200" /> 
            <rect x="10" y="10" rx="0" ry="0" width="280" height="30" /> 
            <rect x="5" y="265" rx="0" ry="0" width="109" height="72" /> 
            <rect x="5" y="406" rx="0" ry="0" width="231" height="32" /> 
            <rect x="5" y="352" rx="0" ry="0" width="172" height="41" />
          </ContentLoader>
        </Card>
      )
    } else {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>
              {`Weather in ${this.state.city}`}
            </Typography>
            <img src={this.state.imgURL}  className={classes.weatherImg} alt="weather condition" />
            <Typography variant="h2">
              {`${this.state.temperature}°`}
            </Typography>
            <Typography variant="h4">
              {this.state.conditions}
            </Typography>
            <Typography variant="h6">
              {`Wind: ${this.state.windSpeed} m/s`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              size="small"
              onClick={this.fetchWeather}
            >
              Refresh
            </Button>
            <Button 
              size="small" 
              color="secondary" 
              onClick={() => this.props.removeZipCode(this.props.zipCode)}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      )
    }
  }
}

WeatherCard.propTypes = {
  zipCode: PropTypes.string.isRequired,
  removeZipCode: PropTypes.func.isRequired
}

export default withStyles(styles)(WeatherCard);