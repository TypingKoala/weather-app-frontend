import React from 'react';
import { Card, CardContent, createMuiTheme, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Typography, withStyles } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import PropTypes from 'prop-types';

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
  card: {
    backgroundColor: "#c2dcff"
  }
};

// A weather card that allows user to input a new zip code
class ZipCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
        <Typography className={classes.title}>
          Enter a new ZIP Code
        </Typography>
        <form 
          className={classes.form} 
          onSubmit={(evt) => {
            evt.preventDefault();
            this.props.submitZipCode();
          }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="zipcode">ZIP Code</InputLabel>
            <Input 
              id="zipcode"
              value={this.props.zipCode}
              onChange={this.props.handleZipCodeChange}
              autoFocus={true}
              error={this.props.error}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="submit" onClick={this.props.submitZipCode}>
                    <ArrowForward />
                  </IconButton>
                </InputAdornment>
              } />
              <FormHelperText>{this.props.helperText}</FormHelperText>
          </FormControl>
        </form>
        </CardContent>
      </Card>
    )
  }
}

ZipCard.propTypes = {
  zipCode: PropTypes.string.isRequired,
  handleZipCodeChange: PropTypes.func.isRequired,
  submitZipCode: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired
}


export default withStyles(styles)(ZipCard);