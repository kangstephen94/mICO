import { getEvents } from '../utils/events_util';
import { getIcos } from '../utils/icos_util';

export const RECEIVE_ICOS = 'RECEIVE_ICOS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_SESSION = 'RECEIVE_SESSION';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const RECEIVE_FAV = 'REVEICE_FAV';
export const RESET_FAV = 'RESET_FAV';

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

export const receiveSearchResults = results => ({
    type: RECEIVE_RESULTS,
    results
});

export const receiveFavScene = () => ({
  type: RECEIVE_FAV
});

export const resetFavScene = () => ({
  type: RESET_FAV
});
