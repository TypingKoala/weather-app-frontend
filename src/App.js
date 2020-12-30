import React from 'react';
import { Container, withStyles } from '@material-ui/core';
import './App.css';
import LoginCard from './LoginCard';
import WeatherGrid from './WeatherGrid';

const styles = {}

class App extends React.Component {
  render() {
    return (
      <Container>
        <LoginCard />
        <WeatherGrid />
      </Container>
    );
  }
  
}

export default withStyles(styles)(App);