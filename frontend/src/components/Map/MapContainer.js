import { connect } from 'react-redux';
import Map from './Map';
import { retrieveEvents } from '../../../actions/all_actions';

const msp = state => {
  console.log(state);
  return (
    { events: state.events}
  );
};


// ({
//   events: state.events
// });

const mdp = dispatch => ({
  retrieveEvents: () => dispatch(retrieveEvents())
});


export default connect(msp, mdp)(Map);
