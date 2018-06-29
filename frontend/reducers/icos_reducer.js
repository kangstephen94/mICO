import merge from 'lodash/merge';
import { RECEIVE_ICOS } from '../actions/all_actions';


const icosReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ICOS:
            return merge({}, action.ico);
        default:
            return state;
    }
};

export default icosReducer;
