import {connect} from 'react-redux';
import Error from '../components/Error';

const mapStateToProps = ({errorMsg}) => ({
    errorMsg
});

const ErrorContainer = connect(mapStateToProps)(Error);

export default ErrorContainer;