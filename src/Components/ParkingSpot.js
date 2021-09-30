import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from '@material-ui/core';
import { useLocation } from "react-router-dom";

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
        color: 'black',
        backgroundColor: '#990597',
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

async function commitParkingSpot(parkingSpot, orderId) {
    alert(`Confirming the parking spot ${parkingSpot} for order-id ${orderId}. This is a back-end call!!`);
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

export default function ParkingSpot() {
    let query = useQuery();
    let orderId = query.get("orderId");
    const classes = useStyles();
    const [, setParkingSpot] = useState(0);

    return (
        <div className={classes.container}>
            <Formik
                initialValues={{
                    parkingSpotNumber: ''
                }}
                onSubmit={async (values) => {
                    setParkingSpot(values.parkingSpotNumber);
                    commitParkingSpot(values.parkingSpotNumber, orderId);
                }}
            >
                <Form className={classes.form}>
                    <Field type="number" className={classes.field} id="parking-spot-number" name="parkingSpotNumber" placeholder="Parking Spot #" />
                    <Button id="set-parking-spot-btn" type="submit" className={classes.button}>Set Parking Spot</Button>
                </Form>
            </Formik>
        </div>
    );
}