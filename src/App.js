import React from 'react';
import { withStyles } from '@material-ui/core';
import './App.css';
import Home from './Home';

const styles = {}

class App extends React.Component {
  render() {
    return (
      <Home />
    );
  }
}

export default withStyles(styles)(App);