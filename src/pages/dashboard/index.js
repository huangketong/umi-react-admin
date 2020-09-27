import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import Demo from './demo';
import HockDemo from './hock';


const Dashboard = ({
    dashboard, dispatch,
}) => {
    const { text } = dashboard;
    const treeData = [{
        title: '0-0',
        key: '0-0',
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
            ],
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
            ],
        }, {
            title: '0-0-2',
            key: '0-0-2',
        }],
    }];

    const demoProps = {
        treeData: treeData,
        text: text,
    };

    const handleTest = useCallback(() => {
        dispatch({
            type: 'dashboard/updateStates',
            payload: {
                text: `${text}*`
            }
        })
    }, [])


    return (
        <div>
            <Button onClick={handleTest}>test</Button>
            <h2>{text}</h2>
            <Demo {...demoProps}/>
            <HockDemo text={'11111'} handleTest={handleTest}/>
        </div>
    );
};

Dashboard.propTypes = {
    dashboard: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
};

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard);
