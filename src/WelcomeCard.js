import { Button, Card, CardContent, Container, makeStyles, Typography } from '@material-ui/core';

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

export default function WelcomeCard(props) {
  const classes = useStyles();

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
            onClick={props.logOutUser}>
            Log-out
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}