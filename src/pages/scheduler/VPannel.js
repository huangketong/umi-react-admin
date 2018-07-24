import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Row, Col, Collapse } from 'antd';
import moment from 'moment';

const Panel = Collapse.Panel;

const VPannel = ({
    hisList,
    hispagination,
    data,
    taskTypeList,
    sysTypeList,
    addressTypeList,
    execFlagList,
    isRecoveryList,
    isSmsList,
}) => {

    const dateFormat = 'YYYY-MM-DD HH:mm:ss';

    const columns = [
        {
            title: '所属系统',
            dataIndex: 'belong_system',
            render: (belong_system) => {
                let str = '';
                let obj = sysTypeList && sysTypeList.find((item) => belong_system == item.dict_no);
                str = obj && obj.dict_name || belong_system;
                return str;
            },
        }, {
            title: '执行条件',
            dataIndex: 'exec_condition',
            key: 'exec_condition',
        }, {
            title: '处理IP',
            dataIndex: 'handle_ip',
            key: 'handle_ip',
        }, {
            title: '任务地址',
            dataIndex: 'task_address',
            key: 'task_address',
        }, {
            title: '任务地址类型',
            dataIndex: 'task_address_type',
            key: 'task_address_type',
            render: (task_address_type) => {
                let str = '';
                let obj = addressTypeList && addressTypeList.find((item) => task_address_type == item.dict_no);
                str = obj && obj.dict_name || task_address_type;
                return str;
            },
        }, {
            title: '任务开始时间',
            dataIndex: 'task_start_time',
            key: 'task_start_time',
            render: (task_start_time) => (
                moment(task_start_time).format(dateFormat)
            ),
        }, {
            title: '任务结束时间',
            dataIndex: 'task_end_time',
            key: 'task_end_time',
            render: (task_end_time) => (
                moment(task_end_time).format(dateFormat)
            ),
        }, {
            title: '结果描述',
            dataIndex: 'task_execute_result_desc',
            key: 'task_execute_result_desc',
        }, {
            title: '下次执行时间',
            dataIndex: 'next_fire_time',
            key: 'next_fire_time',
            render: (next_fire_time) => (
                next_fire_time && moment(next_fire_time).format(dateFormat)
            ),
        },
    ];

    const getDictName = (dict_no, dict) => {
        let dict_name = '';
        if (dict_no && dict) {
            const obj = dict.find((item) => item.dict_no === dict_no);
            if (obj) {
                dict_name = obj.dict_name;
            }
        }

        return dict_name;
    };

    return (
        <div>
            <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="基本信息" key="1" >
                    <Row gutter={8}>
                        <Col lg={8} md={6} sm={24} xs={24}>
                            <ol>
                                <li> <span >任务编码:</span><span >{data.task_key}</span></li>
                                <li> <span >所属系统:</span><span >{getDictName(data.belong_system, sysTypeList)}</span></li>
                                <li> <span >任务执行类:</span><span >{data.task_trigger_class}</span></li>
                                <li> <span >执行条件标识:</span><span >{getDictName(data.exec_condition_flag, execFlagList)}</span></li>
                                <li> <span >失败后操作:</span><span >{getDictName(data.is_recovery, isRecoveryList)}</span></li>
                                <li> <span >短信发送标识:</span><span >{getDictName(data.is_sms, isSmsList)}</span></li>
                                <li> <span >备注:</span><span >{data.remark}</span></li>
                            </ol>
                        </Col>
                        <Col lg={8} md={6} sm={24} xs={24}>
                            <ol>
                                <li> <span >任务名称:</span><span >{data.task_name}</span></li>
                                <li> <span >任务地址类型:</span><span >{getDictName(data.task_address_type, addressTypeList)}</span></li>
                                <li> <span >实例名称:</span><span >{data.task_bean_name}</span></li>
                                <li> <span >延迟时间（秒）:</span><span >{data.relay_time}</span></li>
                                <li> <span >失败重试次数</span><span >{data.recovery_count}</span></li>
                                <li> <span >短信接收人:</span><span >{data.sms_receivers}</span></li>
                                <li> <span >最后更新人:</span><span >{data.updated_by}</span></li>
                            </ol>
                        </Col>
                        <Col lg={8} md={6} sm={24} xs={24}>
                            <ol>
                                <li> <span >任务类型:</span><span >{getDictName(data.task_type, taskTypeList)}</span></li>
                                <li> <span >表达式:</span><span >{data.task_cron_express}</span></li>
                                <li> <span >执行地址:</span><span >{data.task_address}</span></li>
                                <li> <span >超时时间（秒）:</span><span >{data.time_out}</span></li>
                                <li> <span >创建人:</span><span >{data.created_by}</span></li>
                                <li> <span >创建时间:</span><span >{data.created_at ? moment(Number(data.created_at)).format('YYYY-MM-DD HH:mm:ss') : ''}</span></li>
                                <li> <span >最后更新时间:</span><span >{data.updated_at ? moment(Number(data.updated_at)).format('YYYY-MM-DD HH:mm:ss') : ''}</span></li>
                            </ol>
                        </Col>
                    </Row>
                </Panel>
                <Panel header='历史任务' key='2'>
                    <Table
                        columns={columns}
                        dataSource={hisList}
                        pagination={hispagination}
                    />
                </Panel>
            </Collapse>


        </div>
    );
};


VPannel.propTypes = {
    data: PropTypes.array,
};
export default Form.create()(VPannel);
