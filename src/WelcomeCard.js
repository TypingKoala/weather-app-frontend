import { Button, Card, CardContent, Container, Typography, makeStyles } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

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
  },
  button: {
    padding: theme.spacing(2)
  }
}));

export default function WelcomeCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3">
            You are logged in!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={props.logOutUser}>
            Log-out
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => history.push('/changePassword')}>
            Change Password
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}