import React from 'react';
import { Container, withStyles } from '@material-ui/core';
import './App.css';
import LoginCard from './LoginCard';
import WeatherGrid from './WeatherGrid';
import WelcomeCard from './WelcomeCard';

const styles = {}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      loggedIn: false
    }
    this.setLocations = this.setLocations.bind(this);
    this.pushLocationsToServer = this.pushLocationsToServer.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
  }

  componentDidMount() {
    // check if logged in
    if (window.localStorage.getItem('token')) {
      this.setState({ loggedIn: true });
      this.fetchLocations();
    }
  }

  fetchLocations() {
    console.log(window.localStorage.getItem('token'));
    fetch(process.env.REACT_APP_API_ENDPOINT + "/user/getLocations", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) throw new Error(data.error);

      // merge fetched locations with current locations
      const uniqueFetchedLocations = data.locations.filter((fetchedLoc) => !this.state.locations.includes(fetchedLoc));
      const newLocations = this.state.locations.concat(uniqueFetchedLocations);
      this.setState({ locations: newLocations });
    })
    .catch(err => {
      this.logOutUser();
      console.error(err)
    });
  }

  logInUser() {
    this.setState({ loggedIn: true });
  }

  logOutUser() {
    window.localStorage.removeItem('token');
    this.setState({ loggedIn: false });
  }

  setLocations(locations) {
    this.setState({ locations });
  }

  pushLocationsToServer() {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/user/setLocations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({locations: this.state.locations})
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      console.log(data);
    })
    .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.locations !== this.state.locations) {
      this.pushLocationsToServer();
    }
  }

  render() {
    return (
      <Container>
        {(this.state.loggedIn) ? 
          <WelcomeCard
            logOutUser={this.logOutUser} />
          :
          <LoginCard
          logInUser={this.logInUser}
          locations={this.state.locations}
          setLocations={this.setLocations}
          fetchLocations={this.fetchLocations} />
        }
        <WeatherGrid
          locations={this.state.locations}
          setLocations={this.setLocations} />
      </Container>
    );
  }
  
}

export default withStyles(styles)(Home);