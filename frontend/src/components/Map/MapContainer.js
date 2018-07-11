import { connect } from 'react-redux';
import Map from './Map';
import { retrieveEvents, receiveEvents } from '../../../actions/all_actions';

const msp = state => {
  return (
    { events: Object.keys(state.events).map( id => state.events[id]) }
  );
};


const mdp = dispatch => ({
  retrieveEvents: () => dispatch(retrieveEvents()),
  receiveEvents: events => dispatch(receiveEvents(events))
});


export default connect(msp, mdp)(Map);
