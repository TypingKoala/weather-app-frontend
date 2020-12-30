import { Grid } from '@material-ui/core';
import React from 'react';
import ZipCard from './ZipCard';
import WeatherCard from './WeatherCard';

function checkValidZipCode(zipCode, cb) {
  const params = new URLSearchParams({ zipcode: zipCode });
  fetch(process.env.REACT_APP_API_ENDPOINT + "/weather?" + params)
    .then(resp => cb(resp.status === 200))
    .catch(err => cb(false));
}

class WeatherGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      zipCode: '',
      zipCodeError: false,
      zipCodeHelperText: ''
    }
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.submitZipCode = this.submitZipCode.bind(this);
    this.removeZipCode = this.removeZipCode.bind(this);
  }

  handleZipCodeChange(event) {
    this.setState({ zipCode: event.target.value })
  }

  submitZipCode() {
    if (!this.state.zipCode) return;
    if (this.state.locations.includes(this.state.zipCode)) {
      return this.setState({
        zipCodeError: true,
        zipCodeHelperText: "Card already exists for this ZIP Code"
      })
    };

    // check if valid zip code
    checkValidZipCode(this.state.zipCode, (valid) => {
      if (valid) {
        const locations = [...this.state.locations, this.state.zipCode];
        this.setState({
          locations,
          zipCode: "",
          zipCodeError: false,
          zipCodeHelperText: ""
        })
      } else {
        this.setState({
          zipCodeError: true,
          zipCodeHelperText: "Invalid ZIP Code"
        })
      }
    })
  }

  removeZipCode(zipCode) {
    const locations = this.state.locations.filter((location) => location !== zipCode);
    this.setState({ locations });
  }

  render() {
    return (
        <Grid 
          container 
          spacing={3} 
          direction="row" 
          justify="center" 
          alignItems="flex-start"
        >
          {this.state.locations.map((zipCode, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <WeatherCard zipCode={zipCode} removeZipCode={this.removeZipCode} />
          </Grid>
          ))}
  
          {/* The last card is the zipcard */}
          <Grid item xs={12} sm={6} md={3}>
            <ZipCard 
              zipCode={this.state.zipCode} 
              handleZipCodeChange={this.handleZipCodeChange}
              submitZipCode={this.submitZipCode}
              error={this.state.zipCodeError}
              helperText={this.state.zipCodeHelperText} />
          </Grid>
        </Grid>
    );
  }
  
}

export default WeatherGrid;