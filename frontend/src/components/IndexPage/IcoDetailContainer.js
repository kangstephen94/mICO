import { connect } from 'react-redux';
import IcoDetail from './IcoDetail';

const msp = state => ({
    user: state.session
});
export default connect(msp)(IcoDetail);
