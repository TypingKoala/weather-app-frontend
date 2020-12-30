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
    this.removeZipCode = this.removeZipCode.bind(this);
  }

  handleZipCodeChange(event) {
    this.setState({zipCode: event.target.value})
  }

  submitZipCode() {
    if (!this.state.zipCode) return;
    if (this.state.locations.includes(this.state.zipCode)) return;
    const locations = [...this.state.locations, this.state.zipCode];
    this.setState({
      locations,
      zipCode: ""
    })
  }

  removeZipCode(zipCode) {
    const locations = this.state.locations.filter((location) => location !== zipCode);
    this.setState({ locations });
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
              submitZipCode={this.submitZipCode} />
          </Grid>
        </Grid>
      </Container>
    );
  }
  
}

export default App;
