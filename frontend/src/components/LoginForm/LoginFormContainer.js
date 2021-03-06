import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { receiveSession } from '../../../actions/all_actions';


const msp = state => ({
    session: state.session
});

const mdp = dispatch => ({
    receiveSession: (user) => dispatch(receiveSession(user))
});


export default connect(msp, mdp)(LoginForm);
