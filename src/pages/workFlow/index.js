import PropTypes from 'prop-types';
import { connect } from 'dva';


const workFlow = ({
    workFlow
}) => {
    const { text } = workFlow;

    return(
        <div>
            {text}
        </div>
    )
}

workFlow.propTypes = {
    workFlow: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
}

export default connect(({workFlow, loading}) => ({workFlow, loading}))(workFlow);