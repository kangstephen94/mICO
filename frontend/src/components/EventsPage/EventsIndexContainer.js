import { connect } from 'react-redux';
import EventsIndex from './EventsIndex';
import { retrieveEvents } from '../../../actions/all_actions';

const msp = state => ({
  events: state.events
});

const mdp = dispatch => ({
  retrieveEvents: () => dispatch(retrieveEvents())
});

export default connect(msp, mdp)(EventsIndex);
