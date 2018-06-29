import { combineReducers } from 'redux';
import icosReducer from './icos_reducer';
import eventsReducer from './events_reducer';
import sessionReducer from './session_reducer';

export default combineReducers({
    icos: icosReducer,
    events: eventsReducer,
    session: sessionReducer
});