import { Button, Card, CardContent, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { useState } from 'react';
import SignUpCard from './SignUpCard';

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

export default function LoginCard(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/user/getToken", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      // save token to local storage
      window.localStorage.setItem('token', data.token);
      props.logInUser();
      props.fetchLocations();
    })
    .catch(err => console.error(err));
  }
  if (showSignUp) {
    return (
      <SignUpCard
      logInUser={props.logInUser}
      fetchLocations={props.fetchLocations}
      setShowSignUp={setShowSignUp}
    />
    )
  } else {
    return (
      <Container className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h3">
              Welcome!
            </Typography>
            <Typography>
              Log in to save your locations.
            </Typography>
            <form 
              className={classes.form} 
              onSubmit={(evt) => {
                evt.preventDefault();
                handleLogin();
              }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
              Don't have an account?
              <Button onClick={() => setShowSignUp(true)}>Sign-up</Button>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    )
  }
}