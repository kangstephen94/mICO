import { getEvents } from '../utils/events_util';
import { getIcos } from '../utils/icos_util';
import { getUser } from '../utils/session_util';

export const RECEIVE_ICOS = 'RECEIVE_ICOS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_SESSION = 'RECEIVE_SESSION';

export const retrieveEvents = () => dispatch => (
    getEvents().then(events => dispatch(receiveEvents(events)))
);

export const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

export const retrieveIcos = () => dispatch => (
    getIcos().then(icos => dispatch(receiveIcos(icos)))
);

export const receiveIcos = icos => ({
    type: RECEIVE_ICOS,
    icos
});

export const receiveSession = currentUser => ({
    type: RECEIVE_SESSION,
    currentUser
});
