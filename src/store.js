import { combineReducers } from 'redux';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_PUBLISHABLE_KEY = 'UPDATE_PUBLISHABLE_KEY';
const INITIALIZE_RADAR= "INITIALIZE_RADAR";
const START_TRACKING= "START_TRACKING";

export function updateUserId(userId) {
    return {
        type: UPDATE_USER,
        userId,
    }
}

export function updatePublishableKey(publishableKey) {
    console.log(`updatePublishableKey DISPATHED ${publishableKey}`);
    return {
        type: UPDATE_PUBLISHABLE_KEY,
        publishableKey
    }
}

export function initializeRadar(state) {
    console.log(`initializeRadar DISPATHED ${state}`);
    return {
        type: INITIALIZE_RADAR,
        state
    }
}

export function startTracking() {
    console.log(`startTracking DISPATHED`);
    return {
        type: START_TRACKING
    }
}

const defaultConfig = [
    {
        initialized: false,
        userId: 'test-customer-001',
        publishableKey: 'prj_test_pk_test',
    }
];

function trackerState(state = defaultConfig, action) {
    const currentState = state.initialized;
    const currentUserId = state.userId;
    const currentPublishableKey = state.publishableKey;

    switch (action.type) {
        case UPDATE_USER:
            return {
                userId: action.userId,
                publishableKey: currentPublishableKey,
                initialized: currentState
            };
        case UPDATE_PUBLISHABLE_KEY:
            return {
                publishableKey: action.publishableKey,
                userId: currentUserId,
                initialized: currentState
            };
        case INITIALIZE_RADAR:
            return {
                initialized: action.state,
                userId: currentUserId,
                publishableKey: currentPublishableKey
            };
        default:
            return state;
    }
}

const radarTrackerApp = combineReducers({
    trackerState
});

export default radarTrackerApp;