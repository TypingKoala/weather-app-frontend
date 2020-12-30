import React from 'react';
import { Container, Grid } from '@material-ui/core';
import './App.css';
import LoginCard from './LoginCard';
import { WeatherCard, ZipCard } from './WeatherCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      zipCode: ''
    }
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.submitZipCode = this.submitZipCode.bind(this);
  }

  handleZipCodeChange(event) {
    this.setState({zipCode: event.target.value})
  }

  submitZipCode() {
    if (!this.state.zipCode) return;
    const locations = [...this.state.locations, this.state.zipCode];
    this.setState({
      locations,
      zipCode: ""
    })
  }

  render() {
    return (
      <Container>
        <LoginCard />
        {/* Weather Cards Container */}
        <Grid 
          container 
          spacing={3} 
          direction="row" 
          justify="center" 
          alignItems="flex-start"
        >
          {this.state.locations.map((zipcode, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <WeatherCard zipcode={zipcode} />
          </Grid>
          ))}
  
          {/* The last card is the zipcard */}
          <Grid item xs={12} sm={6} md={3}>
            <ZipCard 
              zipCode={this.state.zipCode} 
              handleZipCodeChange={this.handleZipCodeChange}
              submitZipCode={this.submitZipCode} />
          </Grid>
        </Grid>
      </Container>
    );
  }
  
}

export default App;
