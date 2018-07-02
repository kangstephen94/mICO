import { connect } from 'react-redux';
import Footer from './Footer';
import { resetFavScene } from '../../actions/all_actions';

const msp = state => ({
  favScene: state.favoriteScene,
  state
});

const mdp = dispatch => ({
  resetFavScene: () => dispatch(resetFavScene())
});

export default connect(msp, mdp)(Footer);
