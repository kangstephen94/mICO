import merge from 'lodash/merge';
import { RECEIVE_SESSION } from '../actions/all_actions';


const sessionReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SESSION:
            return merge({}, action.currentUser);
        default:
            return state;
    }
};

export default sessionReducer;
