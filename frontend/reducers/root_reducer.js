import { combineReducers } from 'redux';
import icosReducer from './icos_reducer';
import eventsReducer from './events_reducer';
import sessionReducer from './session_reducer';
import searchReducer from './search_reducer';
import favSceneReducer from './favorite_scene_reducer';

export default combineReducers({
    icos: icosReducer,
    events: eventsReducer,
    session: sessionReducer,
    searchResults: searchReducer,
    favoriteScene: favSceneReducer
});
