import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import { Table } from 'antd';
import Filter from './filter';
import { paginationConfig } from '../../constants/pagination';

const Scheduler = ({
    scheduler, dispatch,
}) => {
    const {
        parameters,
        total,
        list,
    } = scheduler;
    const pagination = paginationConfig(total, parameters, dispatch, 'scheduler/getDataList', 'scheduler/updateParameters');

    const filterProps = {
        dispatch,
        parameters,
    };
    const columns = [
        {
            title: '任务编码',
            dataIndex: 'task_code',
        }, {
            title: '任务名称',
            dataIndex: 'task_name',
        }, {
            title: '任务状态',
            dataIndex: 'task_status',
        }, {
            title: '任务类型',
            dataIndex: 'task_type',
        }, {
            title: '实例名称',
            dataIndex: 'task_bean_name',
        }, {
            title: '任务表达式',
            dataIndex: 'task_cron_express',
        },
    ];

    return (
        <QueueAnim>
            <div key='0'>
                <Filter {...filterProps}/>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={(record) => record.id}
                    pagination={pagination}
                />
            </div>
        </QueueAnim>
    );
};

Scheduler.propTypes = {
    dashboard: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
};

export default connect(({ scheduler }) => ({ scheduler }))(Scheduler);
