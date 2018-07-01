import { connect } from 'react-redux';
import SearchList from './SearchList';
import { receiveSearchResults } from '../../../actions/all_actions';


const msp = state => ({
    results: state.searchResults
});

const mdp = dispatch => ({
    receiveSearchResults: (results) => dispatch(receiveSearchResults(results))
});

export default connect(msp, mdp)(SearchList);
