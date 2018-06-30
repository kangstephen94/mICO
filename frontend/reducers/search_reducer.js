import merge from 'lodash/merge';
import { RECEIVE_RESULTS } from '../actions/all_actions';


const searchReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_RESULTS:
            return action.results;
        default:
            return state;
    }
};

export default searchReducer;
