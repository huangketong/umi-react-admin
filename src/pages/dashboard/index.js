import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { Button } from 'antd';


const Dashboard = ({
    dashboard, dispatch,
}) => {
    const { text } = dashboard;

    return (
        <div>
            {text}
        </div>
    );
};

Dashboard.propTypes = {
    dashboard: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
};

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard);
