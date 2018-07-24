import React from 'react';
import { Table } from 'antd';
import { DropOption } from '../../components';
import VPannel from './VPannel';

const List = ({
    dispatch,
    list,
    pagination,
    handleDrop,
    loading,
    expandedRowKey,
    hispagination,
    valueTypeList,
    hisList, hisParams, selectedRows, selectedRowKeys, calledRow,
    taskTypeList,
    sysTypeList,
    taskStatusList,
    addressTypeList,
    execFlagList,
    isRecoveryList,
    isSmsList,
}) => {

    const columns = [
        {
            title: '任务编码',
            key: 'task_key',
            dataIndex: 'task_key',
        }, {
            title: '任务名称',
            key: 'task_name',
            dataIndex: 'task_name',
        }, {
            title: '任务状态',
            key: 'task_status',
            dataIndex: 'task_status',
        }, {
            title: '任务类型',
            key: 'task_type',
            dataIndex: 'task_type',
        }, {
            title: '实例名称',
            key: 'task_bean_name',
            dataIndex: 'task_bean_name',
        }, {
            title: '任务表达式',
            key: 'task_cron_express',
            dataIndex: 'task_cron_express',
        }, {
            title: '归属系统',
            key: 'belong_system',
            dataIndex: 'belong_system',
        }, {
            title: '审核状态',
            key: 'check_flag',
            dataIndex: 'check_flag',
        }, {
            title: '操作',
            render: (text, record) => {
                const menus = [];
                if (record.check_flag === 'UNCHECKED') {
                    menus.push({ key: 'UPDATE', name: '修改' });
                    menus.push({ key: 'AUDIT', name: '审核' });
                    menus.push({ key: 'DELETE', name: '删除' });
                } else {
                    record.task_status === 'STOPPED' && menus.push({ key: 'CANCEL_AUDIT', name: '取消审核' });
                    (record.task_status === 'STOPPED' || record.task_status === 'STANDBY') && menus.push({ key: 'START', name: '启用' });
                    record.task_status === 'STARTED' && menus.push({ key: 'STOP', name: '停用' });
                    (record.check_flag === 'CHECKED' && record.task_status === 'STARTED') && menus.push({ key: 'EXECUTE', name: '立即执行' });
                }

                const view = <DropOption
                    onMenuClick={(e) => handleDrop(record, e)}
                    menuOptions={menus}>
                </DropOption>;

                return view;
            },
        },
    ];

    const onExpandedRowsChange = (keys) => {
        const expandedRowKeys = [];
        expandedRowKeys.push(keys[keys.length - 1]);
        dispatch({ type: 'scheduler/updateState', payload: { expandedRowKey: expandedRowKeys } });
    };

    const onExpand = (expanded, record) => {
        if (expanded) { // 展开
            // 判断是否打开的是同一条数据的详情，如果是，不做请求，如果不是重新请求新的数据
            if (calledRow.id !== record.id) {
                // 异步请求详情数据
                const params = {
                    ...hisParams,
                    id: record.id,
                };
                dispatch({ type: 'scheduler/queryHisTask', payload: params });// 异步请求
                dispatch({ type: 'scheduler/updateState', payload: { hisParams: params } });
                dispatch({ type: 'scheduler/updateState', payload: { calledRow: record } });
            }
        }
    };

    const expandedRowRender = (record) => {
        const panelProps = {
            hisList,
            hispagination,
            dispatch,
            data: record,
            selectedRows,
            selectedRowKeys,
            loading,
            hisParams,
            taskTypeList,
            sysTypeList,
            taskStatusList,
            addressTypeList,
            execFlagList,
            isRecoveryList,
            isSmsList,
            valueTypeList,
        };

        return (
            <VPannel {...panelProps} />
        );
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={(record) => record.id}
                pagination={pagination}
                onExpand={onExpand}
                expandedRowKeys={expandedRowKey}
                onExpandedRowsChange={onExpandedRowsChange}
                loading={loading.effects['scheduler/queryList']}
                expandedRowRender={expandedRowRender}
            />
        </div>
    );
};

export default List;
