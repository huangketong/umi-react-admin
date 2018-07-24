/** **
 * 任务属性
 * *****/

import PropTypes from 'prop-types';
import React from 'react';
import { Table, Button, Modal, Input, Icon, message, Select } from 'antd';
import styles from './propertyConfig.less';
const _ = require('lodash');
const Option = Select.Option;

let tempDataSource;

class PropertyConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.baseListData === null ? 0 : 1,
            data: props.baseListData,
            valueTypeList: [],
        };
    }

        columns = [
            {
                title: '序号',
                render(text, record, index) {
                    return index + 1;
                },
            }, {
                title: '属性名称',
                dataIndex: 'property_key',
                render: (text, record, index) => {
                    const { isEdit, id } = record;
                    return (
                        !isEdit ?
                            <span>{text ? text : '/'}</span>
                            :
                            <Input defaultValue={text} onChange={(e) => this.handleEditChange(e, { key: 'property_key', index, id })} />
                    );
                },
            }, {
                title: '属性值',
                dataIndex: 'property_value',
                render: (text, record, index) => {
                    const { isEdit, id } = record;
                    return (
                        !isEdit ?
                            <span>{text ? text : '/'}</span>
                            :
                            <Input defaultValue={text} onChange={(e) => this.handleEditChange(e, { key: 'property_value', index, id })} />
                    );
                },
            }, {
                title: '值类型',
                dataIndex: 'value_type',
                render: (text, record, index) => {
                    const { isEdit, id } = record;
                    const { valueTypeList } = this.props;
                    return (
                        !isEdit ?
                            <span>{text ? text : '/'}</span>
                            :
                            <Select style={{ width: 220 }}
                                id='value_type'
                                onChange={(value) => { this.handleChangeSubjectList(value, 'value_type', index, id); }}
                                disabled={!isEdit}
                                placeholder='请选择'
                            >
                                {
                                    valueTypeList && valueTypeList.map((item, index) => <Option key={index} value={item.dict_no}>{item.dict_name}</Option>)
                                }
                            </Select>
                    );
                },
            }, {
                title: '属性描述',
                dataIndex: 'property_name',
                render: (text, record, index) => {
                    const { isEdit, id } = record;
                    return (
                        !isEdit ?
                            <span>{text ? text : '/'}</span>
                            :
                            <Input defaultValue={text} onChange={(e) => this.handleEditChange(e, { key: 'property_name', index, id })} />
                    );
                },
            }, {
                title: '备注',
                dataIndex: 'remark',
                render: (text, record, index) => {
                    const { isEdit, id } = record;
                    return (
                        !isEdit ?
                            <span>{text ? text : '/'}</span>
                            :
                            <Input defaultValue={text} onBlur={(e) => this.handleEditChange(e, { key: 'remark', index, id })} />
                    );
                },
            },
            {
                title: '操作',
                render: (text, record, index) => {
                    const {
                        isEdit, id,
                    } = record;
                    const {
                        isApprove,
                        cancelApprove,
                        baseListData,
                    } = this.props;
                    if ( !isApprove && !cancelApprove) {
                        return (

                            <span>
                                {
                                    !isEdit ?
                                        <span>
                                            <a href="#" onClick={(e) => this.handleEdit(e, { baseListData, index, id, isEdit: true })}>编辑</a>
                                            <span className={styles.ant_divider} />
                                            <a href="#" onClick={(e) => this.handleDelete(e, { baseListData, record, index, id })}>删除</a>
                                        </span>
                                        :
                                        <span>
                                            <a href="#" onClick={(e) => this.handleEditSave(e, { baseListData, record, index, id, isEdit: false })}>保存</a>
                                            <span className={styles.ant_divider} />
                                            <a href="#" onClick={(e) => this.handleEditCancel(e, { baseListData, index, id, isEdit: false })}>取消</a>
                                            <span className={styles.ant_divider} />
                                            <a href="#" onClick={(e) => this.handleDelete(e, { baseListData, record, index, id })}>删除</a>
                                        </span>
                                }
                            </span>

                        );
                    }
                },
            },
        ]


    setDelete = ({ baseListData, record }) => {
        const newDatas = baseListData.filter((item) => record !== item);
        const { dispatch } = this.props;
        dispatch({
            type: 'scheduler/updateState',
            payload: { isEdit: false, properties: newDatas },
        });
    }

    setEdit = ({ baseListData, id, index, isEdit }) => {
        if (baseListData && baseListData.length && baseListData[index] && baseListData[index].id === id) {
            baseListData[index].isEdit = isEdit;
            return {
                baseListData: _.cloneDeep(baseListData),
            };
        }
        return {
            baseListData,
        };
    }

    handleEdit = (e, params) => {
        e.preventDefault();
        const { dispatch, baseListData } = this.props;
        tempDataSource = _.cloneDeep(baseListData);
        dispatch({
            type: 'scheduler/updateState',
            payload: this.setEdit(params),
        });
    }

    handleDelete = (e, params) => {
        e.preventDefault();
        Modal.confirm({
            title: '确认要删除该条目吗?', // (序号${index+1})
            content: '提示: 该条目将从当前配置数据中清除。',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.setDelete(params);
            },
        });
    }

    handleChangeSubjectList = (value, key, index, id) => {
        const data = tempDataSource[index];
        if (data && data.id === id && Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = value;
        }
        tempDataSource[index] = data;
    }

    handleEditChange = (e, params) => {
        e.preventDefault();
        const {
            index,
            id,
            key,
        } = params;
        const value = e.target.value;

        const data = tempDataSource[index];
        if (data && data.id === id && Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = value;
        }
        tempDataSource[index] = data;

    }

    handleEditSave = (e, { index, id }) => {
        e.preventDefault();
        const data = tempDataSource[index];
        tempDataSource[index].isEdit = false;
        if (!data || data.id !== id) {
            message.error('保存失败, 该条数据不存在');
            return;
        }

        for (let i = 0; i < tempDataSource.length - 1; i++) {
            const property_key = tempDataSource[i].property_key;
            for (let j = i + 1; j < tempDataSource.length; j++) {
                if (property_key === tempDataSource[j].property_key) {
                    message.error('保存失败, 属性名称不能相同！');
                    return;
                }
            }
        }

        const { dispatch } = this.props;
        dispatch({
            type: 'scheduler/updateState',
            payload: { properties: tempDataSource },
        });

    }

    handleEditCancel = (e, params) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch({
            type: 'scheduler/updateState',
            payload: this.setEdit(params),
        });
    }

    handleAdd = () => {
        tempDataSource = _.cloneDeep(this.props.baseListData) || [];
        const newRecord = {
            property_key: '',
            property_value: '',
            value_type: '',
            remark: '',
            property_name: '',
            id: this.state.id + 1,
            isEdit: true,
        };
        this.setState({ id: this.state.id + 1 });
        tempDataSource.push(newRecord);
        const { dispatch } = this.props;
        dispatch({
            type: 'scheduler/updateState',
            payload: { properties: tempDataSource },
        });
    }

    render() {
        const { baseListData, isApprove, cancelApprove} = this.props;
        return (
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.right_content}>
                        {!isApprove && !cancelApprove ? <Button type='primary' onClick={this.handleAdd}><Icon type="plus" style={{ fontWeight: 800 }} /></Button> : null}
                    </div>
                </div>
                <Table
                    columns={this.columns}
                    dataSource={baseListData}
                    pagination={false}
                // loading={tableLoading}
                ></Table>
            </div>
        );
    }
}

PropertyConfig.propTypes = {
    baseListData: PropTypes.array,
    dispatch: PropTypes.func,
    valueTypeList: PropTypes.array,
    isApprove: PropTypes.element,
    cancelApprove: PropTypes.element,
};

export default PropertyConfig;
