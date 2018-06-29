import { connect } from 'react-redux';
import SearchList from './SearchList';

const msp = state => ({
    results: state.searchResults
});

export default connect(msp)(SearchList);
