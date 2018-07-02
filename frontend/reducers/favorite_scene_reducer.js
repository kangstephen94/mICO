import merge from 'lodash/merge';
import {
  RECEIVE_FAV,
  RESET_FAV
} from '../actions/all_actions';


const favSceneReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FAV:
      return ['favorite'];
    case RESET_FAV:
      return [];
    default:
      return state;
  }
};

export default favSceneReducer;