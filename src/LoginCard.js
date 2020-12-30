import { Card, CardContent, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2, 0, 2)
  },
  title: {
    fontSize: 20
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  }
}));

export default function LoginCard() {
  const classes = useStyles();
  
  return (
    <Container className={classes.container}>
      <Card>
        <CardContent>
          <Typography className={classes.title}>
            Log into the Weather App
          </Typography>
            <form className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                      type="password" 
                      id="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="submit">
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