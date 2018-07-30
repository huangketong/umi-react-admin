import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal } from 'antd';
import styles from './index.less';
import BaseConfig from './BaseConfig';
import PropertyConfig from './PropertyConfig';

const Pannel = ({
    dispatch,
    visible,
    orgAndProList,
    changeRecord,
    sysTypeList,
    taskTypeList,
    isRecoveryList,
    isSmsList,
    addressTypeList,
    execFlagList,
    className,
    properties,
    valueTypeList,
    isEdit,
    isApprove,
    cancelApprove,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
}) => {

    const BaseProps = {
        dispatch,
        orgAndProList,
        changeRecord,
        sysTypeList,
        taskTypeList,
        isRecoveryList,
        isSmsList,
        addressTypeList,
        execFlagList,
        properties,
        handleOk,
        getFieldDecorator,
        isApprove,
        cancelApprove,
    };

    const propertyProps = {
        baseListData: properties,
        dispatch,
        changeRecord,
        valueTypeList,
        isEdit,
        isApprove,
        cancelApprove,
    };

    const handleOk = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                const fields = getFieldsValue();
                // const cron = fields.task_cron_express.split(" ");
                // if (cron.length !== CRON_LENGTH) {
                //     message.warning('表达式格式输入不正确！');
                //     return;
                // }
                if (changeRecord.org_code) { // 修改或审核
                    if (isApprove) {
                        // 审核
                        const params = {
                            agree: true,
                            id: changeRecord.id,
                        };

                        dispatch({
                            type: 'scheduler/auditTask',
                            payload: params,
                        });

                    } else if (cancelApprove) {
                        // 审核
                        const params = {
                            agree: false,
                            id: changeRecord.id,
                        };

                        dispatch({
                            type: 'scheduler/auditTask',
                            payload: params,
                        });
                    } else {
                        // 修改
                        dispatch({
                            type: 'scheduler/updateTask',
                            payload: {
                                ...changeRecord,
                                ...values,
                                org_code: fields.orgAndProduct[0] ? fields.orgAndProduct[0] : changeRecord.org_code,
                                product_code: fields.orgAndProduct[1] ? fields.orgAndProduct[1] : changeRecord.product_code,
                                task_properties: properties,
                            },
                        });
                    }

                } else { // 新增的保存
                    dispatch({
                        type: 'scheduler/addTask',
                        payload: {
                            ...values,
                            org_code: fields.orgAndProduct[0],
                            product_code: fields.orgAndProduct[1],
                            task_properties: properties,
                        },
                    });
                }
            }
        });
    };

    const handleCancel = () => {
        dispatch({
            type: 'scheduler/updateState',
            payload: {
                visible: false,
                isApprove: false,
                cancelApprove: false,
                properties: [],
            },
        });
    };

    return (
        visible && <Modal
            title='任务调度'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="保存"
            cancelText="取消"
            maskClosable={false}
            wrapClassName={'vertical-center-modal'}
            className={styles.modalWidth}
        >
            <BaseConfig {...BaseProps} />
            <PropertyConfig {...propertyProps} />
        </Modal>
    );

};

Pannel.propTypes = {
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
    orgAndProList: PropTypes.any,
    properties: PropTypes.any,
    changeRecord: PropTypes.object,
    sysTypeList: PropTypes.array,
    taskTypeList: PropTypes.array,
    isRecoveryList: PropTypes.array,
    isSmsList: PropTypes.array,
    addressTypeList: PropTypes.array,
    execFlagList: PropTypes.array,
    className: PropTypes.string,
    valueTypeList: PropTypes.array,
    isEdit: PropTypes.bool,
    isApprove: PropTypes.bool,
    cancelApprove: PropTypes.bool,
    form: PropTypes.object,
    getFieldDecorator: PropTypes.func,
    getFieldValue: PropTypes.func,
};

export default Form.create()(Pannel);
