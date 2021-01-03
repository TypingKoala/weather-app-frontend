import { Card, CardContent, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Typography, makeStyles } from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';

import { ArrowForward } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2, 0, 2)
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  card: {
    backgroundColor: "#c2dcff"
  }
}));

export default function ChangePassword(props) {
  let { key } = useParams();
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  
  if (key) {
    window.localStorage.setItem('token', key);
  }

  const handlePasswordChange = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/user/setPassword", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, confirmpassword: confirmPassword})
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      console.log(data);
      setPasswordChanged(true);
    })
    .catch(err => console.error(err));
  }
  
  if (passwordChanged) {
    return (
      <Redirect to="/" />
    )
  } else {
    return (
      <Container className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h3">
                Change Your Password
              </Typography>
              <form 
                className={classes.form} 
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handlePasswordChange();
                }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input 
                        id="password"
                        type="password"
                        onChange={(evt) => setPassword(evt.target.value)}
                        value={password} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                      <Input 
                        type="password" 
                        id="confirmPassword"
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                        value={confirmPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="submit" type="submit">
                              <ArrowForward />
                            </IconButton>
                          </InputAdornment>
                        } />
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
    )
  }
}