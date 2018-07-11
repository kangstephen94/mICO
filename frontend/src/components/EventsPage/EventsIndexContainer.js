import { connect } from 'react-redux';
import EventsIndex from './EventsIndex';
import { retrieveEvents } from '../../../actions/all_actions';

const msp = state => ({
  events: Object.keys(state.events).map( id => state.events[id] )
});

const mdp = dispatch => ({
  retrieveEvents: () => dispatch(retrieveEvents())
});

export default connect(msp, mdp)(EventsIndex);
