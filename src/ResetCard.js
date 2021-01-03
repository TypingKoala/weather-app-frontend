import { Button, Card, CardContent, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Snackbar, Typography, makeStyles } from '@material-ui/core';

import { ArrowForward } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function ResetCard(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const history = useHistory();

  // error snackbar
  const [errorMessage, setErrorMessage] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  // success snackbar
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleReset = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/user/sendResetEmail", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        setErrorMessage(data.error);
        setErrorSnackbarOpen(true);
        throw new Error(data.error);
      } else {
        // save token to local storage
        console.log(data);
        history.push('/');
        setSuccessSnackbarOpen(true);
      }

    })
    .catch(err => console.error(err));
  }
  
  return (
    <Container className={classes.container}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert onClose={() => setSuccessSnackbarOpen(false)} severity="success">
          A password reset link will be sent.
        </Alert>
      </Snackbar>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3">
            Reset Password
          </Typography>
          <Typography>
            Send a reset email to yourself.
          </Typography>
          <form 
            className={classes.form} 
            onSubmit={(evt) => {
              evt.preventDefault();
              handleReset();
            }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input 
                    id="email"
                    onChange={(evt) => setEmail(evt.target.value)}
                    value={email}
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