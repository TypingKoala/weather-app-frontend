import { Container, Grid, makeStyles } from '@material-ui/core';
import './App.css';
import LoginCard from './LoginCard';
import { WeatherCard, ZipCard } from './WeatherCard';

const useStyles = makeStyles((theme) => ({
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
  }
}));

function App() {
  const classes = useStyles();

  const weatherData = [{
    city: "Manhattan",
    temperature: "80",
    conditions: "Sunny",
    humidity: "80%"
  },
  {
    city: "Cambridge",
    temperature: "80",
    conditions: "Sunny",
    humidity: "80%"
  },
  {
    city: "Brookline",
    temperature: "80",
    conditions: "Sunny",
    humidity: "80%"
  },
  {
    city: "Sunnyvale",
    temperature: "80",
    conditions: "Sunny",
    humidity: "80%"
  }]

  return (
    <Container>
      <LoginCard />
      {/* Weather Cards Container */}
      <Grid 
        container 
        spacing={3} 
        direction="row" 
        justify="center" 
        alignItems="flex-start"
      >
        {weatherData.map((data, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={3}>
          <WeatherCard data={data} />
        </Grid>
        ))}

        {/* The last card is the zipcard */}
        <Grid item xs={12} sm={6} md={3}>
          <ZipCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
