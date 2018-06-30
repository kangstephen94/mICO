import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { receiveSearchResults } from '../../../actions/all_actions';


const mdp = dispatch => ({
    receiveSearchResults: (results) => dispatch(receiveSearchResults(results))
});


export default connect(null, mdp)(SearchBar);
