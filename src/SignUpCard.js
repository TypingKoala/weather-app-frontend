import { Button, Card, CardContent, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Typography, makeStyles } from '@material-ui/core';

import { ArrowForward } from '@material-ui/icons';
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

export default function SignUpCard(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/user/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmpassword: confirmPassword })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      // save token to local storage
      console.log(data.token);
      window.localStorage.setItem('token', data.token);
      props.logInUser();
      props.fetchLocations();
    })
    .catch(err => console.error(err));
  }
  
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3">
            Sign-up
          </Typography>
          <Typography>
            Create an account to save your locations.
          </Typography>
          <form 
            className={classes.form} 
            onSubmit={(evt) => {
              evt.preventDefault();
              handleSignup();
            }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input 
                    id="email"
                    onChange={(evt) => setEmail(evt.target.value)}
                    value={email} />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input 
                    type="password" 
                    id="password"
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <Input 
                    type="password" 
                    id="confirmpassword"
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
          <Typography variant="subtitle1">
              Already have an account?
              <Button onClick={props.setLoginCardState}>Sign-in</Button>
            </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}