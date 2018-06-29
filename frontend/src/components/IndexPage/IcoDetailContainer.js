import { connect } from 'react-redux';
import IcoDetail from './IcoDetail';
import { receiveSession } from '../../../actions/all_actions';

const msp = state => ({
    user: state.session
});

const mdp = dispatch => ({
    receiveSession: (user) => dispatch(receiveSession(user))
});
export default connect(msp, mdp)(IcoDetail);
