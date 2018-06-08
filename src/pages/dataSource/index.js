import PropTypes from 'prop-types';
import { connect } from 'dva';

const DataSource = ({
    dataSource,
}) => {
    const { text } = dataSource;

    return (
        <div>
            {text}
            <p>
            </p>
        </div>
    );
};

DataSource.propTypes = {
    dashboard: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
};

export default connect(({ dataSource }) => ({ dataSource }))(DataSource);
