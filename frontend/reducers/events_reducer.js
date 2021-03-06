import merge from 'lodash/merge';
import { RECEIVE_EVENTS } from '../actions/all_actions';


const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_EVENTS:
            return action.events;
        default:
            return state;
    }
};

export default eventsReducer;
