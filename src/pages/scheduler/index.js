import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import Filter from './filter';
import List from './list';
import Pannel from './Pannel';
import { paginationConfig } from '../../constants/pagination';
import {
    taskTypeList, sysTypeList, isRecoveryList, isSmsList, addressTypeList,
    execFlagList, properties, taskStatusList, valueTypeList,
} from '../../constants/dict';

const Scheduler = ({
    scheduler, dispatch, loading,
}) => {
    const {
        parameters,
        total,
        list,
        visible, changeRecord,
        isEdit, isApprove, cancelApprove,
        hisList, hisTotal, expandedRowKey, hisParams, selectedRows, selectedRowKeys, calledRow,
    } = scheduler;
    const pagination = paginationConfig(total, parameters, dispatch, 'scheduler/getDataList', 'scheduler/updateParameters');
    const hispagination = paginationConfig(hisTotal, hisParams, dispatch, 'scheduler/queryHisTask', 'scheduler/updatePaginationHisParams');

    const handleSearch = () => {
        dispatch({
            type: 'scheduler/queryList',
            payload: {
                ...parameters,
            },
        });
    };

    const updateparams = (param) => {
        dispatch({
            type: 'scheduler/updateState',
            payload: {
                parameters: { ...parameters, ...param },
            },
        });
    };

    const handleAdd = () => {
        dispatch({
            type: 'scheduler/updateState',
            payload: { visible: true, changeRecord: {} },
        });
    };


    const filterProps = {
        dispatch,
        parameters,
        handleSearch,
        updateparams,
        handleAdd,
        sysTypeList,
        taskTypeList,
    };
    const listProps = {
        loading,
        pagination,
        dispatch,
        list,
        hispagination,
        handleDrop,
        valueTypeList,
        isEdit, isApprove,
        cancelApprove,
        hisList, hisTotal, expandedRowKey, hisParams, selectedRows, selectedRowKeys, calledRow,
        taskStatusList,
    };

    const handleDrop = (record, e) => {
        if (e.key == 'UPDATE') {
            handleChange(record);
        } else if (e.key == 'AUDIT') {
            handelApprove(record);
        } else if (e.key == 'DELETE') {
            handelDelete(record);
        } else if (e.key == 'CANCEL_AUDIT') {
            handelCancelApprove(record);
        } else if (e.key == 'START') {
            handleEnable(record);
        } else if (e.key == 'STOP') {
            handleDisable(record);
        } else if (e.key == 'EXECUTE') {
            handleExecute(record);
        }
    };
    const handleChange = (record) => {
        dispatch({
            type: 'scheduler/queryDetail',
            payload: record.id,
        });
        dispatch({
            type: 'scheduler/updateState',
            payload: { visible: true },
        });
    };

    const handelApprove = (record) => {
        dispatch({
            type: 'scheduler/queryDetail',
            payload: record.id,
        });
        dispatch({
            type: 'scheduler/updateState',
            payload: {
                visible: true,
                isApprove: true,
            },
        });
    };

    const handelDelete = (record) => {
        const parameter = {
            id: record.id,
        };
        confirm({
            title: '你确定要删除这条信息吗?',
            onOk() {
                dispatch({
                    type: 'scheduler/deleteTask',
                    payload: parameter,
                });
            },
        });
    };

    const handleEnable = (record) => {
        confirm({
            title: '你确定要启用此任务吗?',
            onOk() {
                dispatch({
                    type: 'scheduler/enableTask',
                    payload: record.id,
                });
            },
        });
    };

    const handleDisable = (record) => {
        confirm({
            title: '你确定要停用此任务吗?',
            onOk() {
                dispatch({
                    type: 'scheduler/disableTask',
                    payload: record.id,
                });
            },
        });
    };

    const handleExecute = (record) => {
        confirm({
            title: '你确定要立即执行此任务吗?',
            onOk() {
                dispatch({
                    type: 'scheduler/executeTask',
                    payload: record.id,
                });
            },
        });
    };

    const handelCancelApprove = (record) => {
        dispatch({
            type: 'scheduler/queryDetail',
            payload: record.id,
        });
        dispatch({
            type: 'scheduler/updateState',
            payload: {
                visible: true,
                cancelApprove: true,
            },
        });
    };

    const pannelProps = {
        dispatch,
        visible,
        changeRecord,
        sysTypeList,
        taskTypeList,
        isRecoveryList,
        isSmsList,
        addressTypeList,
        execFlagList,
        properties,
        valueTypeList,
        isEdit,
        isApprove,
        cancelApprove,
    };

    return (
        <QueueAnim>
            <div key='0'>
                <Filter {...filterProps}/>
                <List {...listProps}/>
                <Pannel {...pannelProps} />
            </div>
        </QueueAnim>
    );
};

Scheduler.propTypes = {
    scheduler: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
};

export default connect(({ scheduler, loading }) => ({ scheduler, loading }))(Scheduler);
