import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Radar from '../Radar';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserId, initializeRadar } from '../store';
import {
    useLocation,
    useHistory
} from "react-router-dom";

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
        minWidth: '380px',
        margin: '5px',
        color: 'black',
        backgroundColor: 'gray',
        borderRadius: '5px',
        border: '1pt',
        borderColor: 'black',
        height: '30px',
        [theme.breakpoints.down('xs')]: {
            margin: '5px',
            height: '50px',
        },
    },

    imHereButton: {
        marginBottom: '5px !important',
        maxWidth: '400px',
        minWidth: '380px',
        margin: '5px',
        color: 'black',
        backgroundColor: '#054f99',
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

async function initialize(publishableKey) {
    Radar.initialize(publishableKey);
}

async function setRadarUser(userid) {
    Radar.setUserId(userid);
}

async function imHere() {
    Radar.trackOnce(function (err, responseObj, response) {
        const location = responseObj.location;
        const user = responseObj.user;
        const events = responseObj.events;

        console.log(err, location, user, events, response);
    });
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

export default function TrackMe() {

    const [arrived, setArraived] = useState(false);
    const [userLocation, setLocation] = useState();

    let query = useQuery();
    let orderId = query.get("orderId");
    let mode = query.get("mode");
    let storeTag = query.get("storeTag");
    let storeId = query.get("storeId");
    let userId = query.get("userId");



    useEffect(() => {
        const tripOptions = {
            externalId: orderId,
            mode: mode,
            destinationGeofenceTag: storeTag,
            destinationGeofenceExternalId: storeId,
            userId: userId,
        }

        Radar.startTrip(tripOptions, function (err, responseObj, response) {
            const trip = responseObj.trip;
            console.log(err, trip, response);
        });

        if (userId) {
            Radar.setUserId(userId);
        }

        console.log(`userLocation ${JSON.stringify(userLocation)}`);

        if (userLocation && userLocation.length > 0) {
            if (userLocation[0].externalId && userLocation[0].externalId === storeId) {
                setArraived(true);
            }
        }
    }, [userId, mode, orderId, storeTag, userLocation, storeId]);

    useEffect(() => {
        let interval = null;
        if (!arrived) {
            interval = setInterval(() => {
                Radar.trackOnce(function (err, responseObj, response) {
                    const location = responseObj.location;
                    const user = responseObj.user;
                    const events = responseObj.events;

                    if (location) {
                        setLocation(user.geofences);
                    }
                    console.log(err, location, user, events, response);
                });
            }, 10000);
        } else {
            clearInterval(interval);
        }
    }, [arrived, userLocation]);

    const classes = useStyles();
    const trackerState = useSelector(state => state.trackerState);
    const dispatch = useDispatch();

    const history = useHistory();
    const handleRouting = (url) => history.push(url);

    return (
        <div className={classes.container}>
            <h3>Tracking</h3>
            <Formik
                initialValues={{
                    userId: userId ?? ''
                }}
                onSubmit={async (values) => {
                    console.log(`state ${JSON.stringify(trackerState)}`);
                    if (!trackerState.initialized) {
                        console.log(`Radar not initialized`);
                        initialize(trackerState.publishableKey);
                        dispatch(initializeRadar(true));
                    }
                    dispatch(updateUserId(values.userId));
                    setRadarUser(values.userId);
                }}
            >
                <Form className={classes.form}>
                    <Field className={classes.field} id="user-id" name="userId" placeholder="Enter User Id" />
                    <Button id="set-user-id-btn" type="submit" className={classes.button}>Set User Id</Button>
                </Form>
            </Formik>

            <Button
                className={classes.imHereButton}
                id="track-btn"
                disabled={!arrived}
                onClick={() => {
                    if (!trackerState.initialized) {
                        console.log(`Radar not initialized`);
                        initialize(trackerState.publishableKey);
                        dispatch(initializeRadar(true));
                    }
                    imHere();
                    handleRouting(`/parking-spot?orderId=${orderId}`);
                }}>I'm Here</Button>
        </div>
    );
}