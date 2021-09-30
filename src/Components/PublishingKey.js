import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { updatePublishableKey } from '../store';
import { Button } from '@material-ui/core';

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
        backgroundColor: '#058899',
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
            height: '50px',
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

export default function PublishingKey() {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Formik
                initialValues={{
                    publishingKey: 'prj_test_pk_test'
                }}
                onSubmit={
                    async (values) => {
                        dispatch(updatePublishableKey(values.publishingKey));
                    }}
            >
                <Form className={classes.form}>
                    <label htmlFor="publishing-key">Your own publishable key</label>
                    <Field className={classes.field} id="publishing-key" name="publishingKey"
                        placeholder="Your own publishable key" />
                    <Button id="set-publishing-key-btn" type="submit" className={classes.button}>Set Publishable Key</Button>
                </Form>
            </Formik>

            <p>Once you have set the publishable key of your Radar.io account;</p>
            <ul>
                <li>navigate to <a href="/trips">/trips</a> for create a trip. </li>
                <li>navigate to <a href="/track">/track</a> for user/trip tracking.</li>
            </ul>
        </div >
    );
}