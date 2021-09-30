import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

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
            display: 'gird',
            margin: 'auto',
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
            margin: '5px',
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


export default function Status() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
        <div className="loader pl-3 d-none">
          <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#007bff">
            <g fill="none" fill-rule="evenodd" stroke-width="2">
              <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline"
                  keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
              </circle>
              <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline"
                  keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>

        <div className="error p-3 d-none">
          <div id="error-message" className="alert alert-danger" role="alert">
          </div>
        </div>

        <div className="results p-3 d-none">
          <div>
            <h3>Status</h3>
            <div className="result">
              <pre><code id="status"></code></pre>
            </div>
          </div>

          <div className="mt-4">
            <h3>Location</h3>
            <div className="result">
              <pre><code id="location"></code></pre>
            </div>
          </div>

          <div className="mt-4">
            <h3>User</h3>
            <div className="result">
              <pre><code id="user"></code></pre>
            </div>
          </div>

          <div className="mt-4">
            <h3>Events</h3>
            <div className="result">
              <pre><code id="events"></code></pre>
            </div>
          </div>
        </div>
        </div>
    );
}