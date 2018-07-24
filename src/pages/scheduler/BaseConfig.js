import React from 'react';
import { Form, Select, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const layout = {
    xs: {
        span: 24,
    },
    lg: { span: 12 },
};

const formItemLayout = {
    labelCol: {
        sm: { span: 24 },
        lg: { span: 8 },
    },
    wrapperCol: {
        sm: { span: 24 },
        lg: { span: 16 },
    },
};

const regChinese = /^[^\u4e00-\u9fa5]{0,}$/;

const BaseConfig = ({
    changeRecord,
    sysTypeList,
    taskTypeList,
    isRecoveryList,
    isSmsList,
    addressTypeList,
    execFlagList,
    getFieldDecorator,
    isApprove,
    cancelApprove,
}) => (
    <Form>
        <Row>
            <Col {...layout}>
                <FormItem label='任务编码' {...formItemLayout}>
                    {getFieldDecorator('task_key', {
                        rules: [{ required: true, message:'请填写任务编码' }],
                        initialValue: changeRecord.task_key || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='所属系统' {...formItemLayout}>
                    {getFieldDecorator('belong_system', {
                        rules: [{ required: true, message: '请选择所属系统' }],
                        initialValue: changeRecord.belong_system || null,
                    })(
                        <Select
                            disabled={isApprove || cancelApprove}
                            style={{ width: 200 }}
                        >
                            {
                                sysTypeList && sysTypeList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='表达式' {...formItemLayout}>
                    {getFieldDecorator('task_cron_express', {
                        rules: [{ required: true, message:'不允许输入中文', pattern: regChinese }],
                        initialValue: changeRecord.task_cron_express || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='任务名称' {...formItemLayout}>
                    {getFieldDecorator('task_name', {
                        rules: [{ required: true, message:'请填写任务名称' }],
                        initialValue: changeRecord.task_name || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='任务类型' {...formItemLayout}>
                    {getFieldDecorator('task_type', {
                        rules: [{ required: true, message: '请选择任务类型' }],
                        initialValue: changeRecord.task_type || null,
                    })(
                        <Select
                            disabled={isApprove || cancelApprove}
                            style={{ width: 200 }}
                        >
                            {
                                taskTypeList && taskTypeList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='任务地址类型' {...formItemLayout}>
                    {getFieldDecorator('task_address_type', {
                        rules: [{ required: true, message: '请选择任务地址类型' }],
                        initialValue: changeRecord.task_address_type || null,
                    })(
                        <Select
                            disabled={isApprove || cancelApprove}
                            style={{ width: 200 }}
                        >
                            {
                                addressTypeList && addressTypeList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='实例名称' {...formItemLayout}>
                    {getFieldDecorator('task_bean_name', {
                        rules: [{ required: true, message:'请填写实例名称' }],
                        initialValue: changeRecord.task_bean_name || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='执行地址' {...formItemLayout}>
                    {getFieldDecorator('task_address', {
                        rules: [{ required: true, message:'请填写执行地址' }],
                        initialValue: changeRecord.task_address || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='执行条件标识' {...formItemLayout}>
                    {getFieldDecorator('exec_condition_flag', {
                        rules: [{ required: true, message: '请选择执行条件标识' }],
                        initialValue: changeRecord.exec_condition_flag || null,
                    })(
                        <Select
                            disabled={isApprove || cancelApprove}
                            style={{ width: 200 }}
                        >
                            {
                                execFlagList && execFlagList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='失败后操作' {...formItemLayout}>
                    {getFieldDecorator('is_recovery', {
                        rules: [{ required: true, message: '请选择失败后操作' }],
                        initialValue: changeRecord.is_recovery || null,
                    })(
                        <Select
                            disabled={isApprove || cancelApprove}
                            style={{ width: 200 }}
                        >
                            {
                                isRecoveryList && isRecoveryList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='延迟时间（秒）' {...formItemLayout}>
                    {getFieldDecorator('relay_time', {
                        rules: [{ required: false }],
                        initialValue: changeRecord.relay_time || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='超时时间（秒）' {...formItemLayout}>
                    {getFieldDecorator('time_out', {
                        rules: [{ required: true, message:'请填写超时时间'}],
                        initialValue: changeRecord.time_out || 0,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='失败重试次数' {...formItemLayout}>
                    {getFieldDecorator('recovery_count', {
                        rules: [{ required: false }],
                        initialValue: changeRecord.recovery_count || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='短信发送标识' {...formItemLayout}>
                    {getFieldDecorator('is_sms', {
                        rules: [{ required: true, message: '请选择短信发送标识' }],
                        initialValue: changeRecord.is_sms || null,
                    })(
                        <Select
                            disabled={isApprove || cancelApprove}
                            style={{ width: 200 }}
                        >
                            {
                                isSmsList && isSmsList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='短信接收人' {...formItemLayout}>
                    {getFieldDecorator('sms_receiver', {
                        rules: [{ required: false }],
                        initialValue: changeRecord.sms_receivers || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='任务执行类' {...formItemLayout}>
                    {getFieldDecorator('task_trigger_class', {
                        rules: [{ required: false }],
                        initialValue: changeRecord.task_trigger_class || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
            <Col {...layout}>
                <FormItem label='备注' {...formItemLayout}>
                    {getFieldDecorator('remark', {
                        rules: [{ required: false }],
                        initialValue: changeRecord.remark || null,
                    })(
                        <Input disabled={isApprove || cancelApprove} style={{ width: 200 }} />
                    )}
                </FormItem>
            </Col>
        </Row>
    </Form>
);

export default BaseConfig;
