import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ParkingSpot from './Components/ParkingSpot';
import PublishingKey from './Components/PublishingKey';
import TrackMe from './Components/TrackMe';
import Trip from './Components/Trip';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  links: {
    backgroundColor: '#545b62',
    borderColor: '#4e555b',
    active: {
      backgroundColor: '#545b62',
      borderColor: '#4e555b',
    }
  },

  result: {
    backgroundColor: '#f7f7f9',
    borderRadius: '0.5rem',
    padding: '1.5rem',
  },

  container: {
    display: 'block',
    margin: 'auto',
    width: '400px',
    padding: '5px',
    [theme.breakpoints.down('xs')]: {
      paddingRight: '15px !important'
    },
  },

  pre: {
    margin: 0
  },

  button: {
    marginBottom: '5px !important',
    maxWidth: '400px',
    margin: '5px',
    color: 'white',
    backgroundColor: 'gray',
    borderRadius: '5px',
    border: '1pt',
    borderColor: 'black',
    height: '30px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },

  fullPage: {
    display: 'block',
    margin: 'auto',
    width: '100%'
  },

  form: {
    display: 'grid',
  },

  formButtons: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'stretch',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'block',
      margin: 'auto'
    }
  },

  field: {
    margin: '5px',
    height: '30px',
  },

  parkingSpot: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'block',
      margin: 'auto'
    }
  },

  title: {
    textAlign: 'center'
  },

  maxWidth: {
    width: '380px',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">

      <div className={classes.container}>
        <h1 className="title">Check-In App</h1>
      </div>

      <Router>
        <div>
          <Switch>
            <Route path="/trips">
              <Trip />
            </Route>
            <Route path="/track">
              <TrackMe />
            </Route>
            <Route path="/parking-spot">
              <ParkingSpot />
            </Route>
            <Route path="/">
              <PublishingKey />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
