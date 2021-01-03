import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import ChangePassword from './ChangePassword';
import Home from './Home';
import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/changePassword/:key">
            <ChangePassword />
          </Route>
          <Route path="/changePassword">
            <ChangePassword />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withStyles(styles)(App);