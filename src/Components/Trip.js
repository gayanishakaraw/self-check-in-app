import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Radar from '../Radar';
import { Button } from '@material-ui/core';
import {
    BrowserRouter as Router,
    useLocation,
    useHistory
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { startTracking } from '../store';

const useStyles = makeStyles((theme) => ({
    links: {
        backgroundColor: '#545b62',
        borderColor: '#4e555b',
        active: {
            backgroundColor: 'aqq21545b62',
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
        minWidth: '380px',
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

    startButton: {
        marginBottom: '5px !important',
        maxWidth: '400px',
        minWidth: '380px',
        margin: '5px',
        color: 'black',
        backgroundColor: '#0a571f',
        borderRadius: '5px',
        border: '1pt',
        borderColor: 'black',
        height: '30px',
        [theme.breakpoints.down('xs')]: {
            margin: '5px',
            height: '50px',
        },
    },

    endButton: {
        marginBottom: '5px !important',
        maxWidth: '400px',
        minWidth: '380px',
        margin: '5px',
        color: 'black',
        backgroundColor: '#940404',
        borderRadius: '5px',
        border: '1pt',
        borderColor: 'black',
        height: '30px',
        [theme.breakpoints.down('xs')]: {
            margin: '5px',
            height: '50px',
        },
    },

    fullPage: {
        display: 'block',
        margin: 'auto',
        width: '100%'
    },

    form: {
        display: 'grid',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'grid',
            margin: 'auto'
        }
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
    },
    lable: {
        textAlign: 'left'
    }
}));

async function startRadarTrip(tripOptions) {
    console.log(JSON.stringify(tripOptions));
    Radar.startTrip(tripOptions, function (err, responseObj, response) {
        const trip = responseObj.trip;
        console.log(err, trip, response);
    });
};

async function completeTrip() {
    Radar.completeTrip(function (err, responseObj, response) {
        const trip = responseObj.trip;
        console.log(err, trip, response);
    });
};

async function startTripTracking() {
    console.log('startTracking');
    //Radar.startTracking(RadarTrackingOptions.continuous);
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

export default function Trip(props) {
    let query = useQuery();

    let orderId = query.get("orderId");
    let mode = query.get("mode");
    let storeTag = query.get("storeTag");
    let storeId = query.get("storeId");
    let userId = query.get("userId");

    const dispatch = useDispatch();
    const classes = useStyles();
    const [tripId, setTripId] = useState('');
    const [tripMode, setTripMode] = useState('');
    const [tripDestinationTag, setTripDestinationTag] = useState('');
    const [tripDestinationExternalId, setTripDestinationExternalId] = useState('');

    const history = useHistory();

    const handleRouting = (url) => history.push(url);

    return (
        <div className={classes.container}>
            <h3>Trip Details</h3>
            <br />
            <Formik
                initialValues={{
                    tripId: orderId ?? '',
                    tripMode: mode ?? '',
                    tripDestinationTag: storeTag ?? '',
                    tripDestinationExternalId: storeId ?? ''
                }}
                onSubmit={async (values) => {

                    setTripId(orderId);
                    setTripMode(mode);
                    setTripDestinationTag(storeTag);
                    setTripDestinationExternalId(storeId);

                    const tripOptions = {
                        externalId: values.tripId,
                        mode: values.tripMode,
                        destinationGeofenceTag: values.tripDestinationTag,
                        destinationGeofenceExternalId: values.tripDestinationExternalId,
                        userId: props.userId,
                    }

                    startRadarTrip(tripOptions);
                    dispatch(startTracking());
                    startTripTracking();

                    console.log(`values.tripId ${values.tripId}`);

                    let url = `/track?orderId=${values.tripId}&mode=${values.tripMode}&storeTag=${values.tripDestinationTag}&storeId=${values.tripDestinationExternalId}`;
                    console.log(`url ${url}`);
                    
                    handleRouting(url);
                }}
            >
                <Form className={classes.form}>
                    <label htmlFor="trip-id">Trip ID/Order ID</label>
                    <Field className={classes.field} id="trip-id" name="tripId" placeholder="Enter Trip Id" />
                    <label htmlFor="trip-mode">Trip Mode</label>
                    <Field className={classes.field} id="trip-mode" name="tripMode" as="select">
                        <option value="" label="Select a mode" />
                        <option value="car" label="car" />
                        <option value="foot" label="foot" />
                        <option value="bike" label="bike" />
                        <option value="truck" label="truck" />
                        <option value="motorbike" label="motorbike" />
                    </Field>
                    <label htmlFor="trip-destination-tag">Destination Tag/Store Tag</label>
                    <Field className={classes.field} id="trip-destination-tag" name="tripDestinationTag" placeholder="Enter Destination Geofence Tag" />
                    <label htmlFor="trip-destination-external-id">Destination Geofence External Id/Store Id</label>
                    <Field className={classes.field} id="trip-destination-external-id" name="tripDestinationExternalId" placeholder="Enter Destination Geofence External Id" />
                    <Button type="submit" className={classes.startButton}>Start Trip</Button>
                </Form>
            </Formik>
            <Button
                className={classes.endButton}
                id="trip-complete-btn"
                onClick={() => completeTrip()}>Complete Trip</Button>
        </div>
    );
}