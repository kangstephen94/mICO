import { connect } from 'react-redux';
import EventsIndex from './EventsIndex';
import { receiveEvents } from '../../../actions/all_actions';

const msp = state => ({
  state
});

const mdp = dispatch => ({
  receiveEvents: () => dispatch(receiveEvents())
});

export default connect(msp, mdp)(EventsIndex);
