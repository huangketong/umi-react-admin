import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Modal, message, notification, Select } from 'antd';
import { renderText } from '../../utils';
const _ = require('lodash');
const Option = Select.Option;

const ValidationInputIsEmpty = (value, error) => {
    if (value === '') {
        message.error(error);
        return false;
    }
    return true;
};
const unique = (tempDataSource) => {
    let flag = true;
    for (let i = 0; i < tempDataSource.length; i++) {
        if (tempDataSource[i].isEdit) {
            notification.warning({
                message: '温馨提示',
                description: '请优先确认真正编辑的数据',
            });
            flag = false;
            break;
        }
    }
    return flag;
};


export default class EditList extends Component {
    static propTypes = {
        commonConfData: PropTypes.array.isRequired, // 传进的数据源
        propsDataName: PropTypes.string.isRequired, // 传进的数据源对应的父级名字
        dispatch: PropTypes.func.isRequired,
        actionName: PropTypes.string.isRequired,
        columnsConf: PropTypes.array.isRequired,
        relation: PropTypes.bool,
    }
    state = {
        commonConfData: this.props.commonConfData, // 组件自身需要的配置数据
        commonConfDataCache: [], // 编辑前数据的缓存
        addEditing: false, // 新增触发的编辑
        editing: false, // 修改触发的编辑
    }
    /**
     {
        title: '名称',
        key: 'name',
        type: 'input', 'input' || 'select'
        dict: [],
     }
     * **/
    renderColumns = this.props.columnsConf.map((ele) => {
        const {
            title, key, type, dict,
        } = ele;

        if (type === 'input') {
            return {
                "title": title,
                "key": key,
                "dataIndex": key,
                "render": (text, record, index) => {
                    const { isEdit, id } = record;
                    return (
                        !isEdit ?
                            <span>{text || '/'}</span>
                            :
                            <Input defaultValue={text} onChange={(e) => this.handleEditChange(e, { key: key, index, id })} />
                    );
                },
            };
        } else if (type === 'select') {
            return {
                "title": title,
                "key": key,
                "dataIndex": key,
                "render": (text, record, index) => {
                    const { isEdit, id } = record;
                    return (
                        !isEdit ?
                            <span>{text ? renderText(dict, text) : '/'}</span>
                            :
                            <Select defaultValue={text} onChange={(value) => this.handleEditChangeSelect(value, { key: key, index, id })}
                                style={{ width: '100%' }}
                            >
                                {dict.map((ele, k) => <Option key={k} value={ele.value}>{ele.text}</Option>)}
                            </Select>
                    );
                },
            };
        }
    }
    ).concat(
        {
            title: '操作',
            key: 'operate',
            render: (text, record, index) => {
                const {
                    isEdit, id,
                } = record;
                const {
                    commonConfData,
                } = this.state;

                return (

                    <span>
                        {
                            !isEdit ?
                                <span>
                                    <a disabled={this.props.relation} href="#" onClick={(e) => this.handleEdit(e, { commonConfData, index, id, isEdit: true })}>编辑</a>
                                    &nbsp;|&nbsp;
                                    <a disabled={this.props.relation} href="#" onClick={(e) => this.handleDelete(e, { commonConfData, record, index, id })}>删除</a>
                                </span>
                                :
                                <span>
                                    <a href="#" onClick={(e) => this.handleEditSave(e, { commonConfData, record, index, id, isEdit: false })}>保存</a>
                                    &nbsp;|&nbsp;
                                    <a href="#" onClick={(e) => this.handleEditCancel(e, { commonConfData, index, id, isEdit: false })}>取消</a>
                                    &nbsp;|&nbsp;
                                    <a href="#" onClick={(e) => this.handleDelete(e, { commonConfData, record, index, id })}>删除</a>
                                </span>
                        }
                    </span>

                );
            },
        }
    );

    setDelete = ({ commonConfData, record }) => {
        let newDatas = commonConfData.filter((item) => record !== item);
        const {
            dispatch,
            actionName,
            propsDataName,
        } = this.props;
        dispatch({
            type: actionName,
            payload: { [propsDataName]: newDatas },
        });
        this.setState({
            commonConfData: newDatas,
        });
    }

    setEdit = ({ commonConfData, id, index, isEdit }) => {
        if (commonConfData && commonConfData.length && commonConfData[index] && commonConfData[index].id === id) {
            let tmpData = _.cloneDeep(commonConfData);
            tmpData[index].isEdit = isEdit;
            return {
                commonConfData: tmpData,
            };
        }
        return {
            commonConfData,
        };
    }

    handleEdit = (e, params) => {
        e.preventDefault();
        const {
            commonConfData, id, index, isEdit,
        } = params;
        // 保证每次只编辑一条数据
        if (!unique(commonConfData)) return false;

        const commonConfDataCache = _.cloneDeep(commonConfData);

        this.setState({
            commonConfDataCache: commonConfDataCache,
            editing: true,
        }); // 缓存点击编辑前的数据

        this.setState(this.setEdit(params));
    }

    handleDelete = (e, params) => {
        e.preventDefault();
        const {
            commonConfData,
            isEdit,
            index,
        } = params;
        // 保证每次只编辑一条数据
        for (let i = 0; i < commonConfData.length; i++) {
            if (commonConfData[i].isEdit && i !== index) {
                notification.warning({
                    message: '温馨提示',
                    description: '请优先确认真正编辑的数据',
                });
                return false;
            }
        }
        Modal.confirm({
            title: '确认要删除该条目吗?',
            content: '提示: 该条目将从当前配置数据中清除。',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.setDelete(params);
            },
        });
    }

    handleEditChange = (e, params) => {
        e.preventDefault();
        const {
            index,
            id,
            key,
        } = params;
        const value = e.target.value;

        const { commonConfData } = this.state;

        let data = commonConfData[index];
        if (data && data.id === id && Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = value;
        }
        let tempDataSource = _.cloneDeep(commonConfData);

        tempDataSource[index] = data;
        this.setState({
            commonConfData: tempDataSource,
        });
    }

    handleEditChangeSelect = (value, params) => {
        const {
            index,
            id,
            key,
        } = params;
        const { commonConfData } = this.state;

        let data = commonConfData[index];

        if (data && data.id === id && Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = value;
        }
        let tempDataSource = _.cloneDeep(commonConfData);

        tempDataSource[index] = data;

        this.setState({
            commonConfData: tempDataSource,
        });
    }

    handleEditSave = (e, { index, id }) => {
        e.preventDefault();
        const { commonConfData } = this.state;
        const data = commonConfData[index];
        let tempDataSource = _.cloneDeep(commonConfData);

        tempDataSource[index].isEdit = false;
        if (!data || data.id !== id) {
            message.error('保存失败, 该条数据不存在');
            return;
        }

        // for (let i = 0; i < tempDataSource.length - 1; i++) {
        //     let value = tempDataSource[i].value;
        //     for (let j = i + 1; j < tempDataSource.length; j++) {
        //         if (value === tempDataSource[j].value) {
        //             message.error('保存失败, 属性值不能相同');
        //             return;
        //         }
        //     }
        // }

        const { columnsConf } = this.props;

        for (let i = 0; i < columnsConf.length; i++) {
            const target = data[columnsConf[i].key];
            if (!ValidationInputIsEmpty(target, '请填写属性名称')) {
                return;
            }
        }

        // if (!reg.test(value)) {
        //     message.error('属性值要求正整数');
        //     return;
        // }
        const {
            dispatch,
            actionName,
            propsDataName,
        } = this.props;
        dispatch({
            type: actionName,
            payload: { [propsDataName]: tempDataSource },
        });
        this.setState({
            commonConfData: tempDataSource,
            editing: false,
            addEditing: false,
        });
    }

    handleEditCancel = (e, params) => {
        e.preventDefault();
        const { index, id, isEdit, commonConfData } = params;
        let tmpData = _.cloneDeep(commonConfData);
        const {
            commonConfDataCache,
            editing,
            addEditing,
        } = this.state;

        if (editing) {
            tmpData[index] = commonConfDataCache[index];
            tmpData[index]['isEdit'] = isEdit;
        }

        if (addEditing) {
            tmpData.splice(index, 1);
        }

        this.setState({
            commonConfData: tmpData,
            editing: false,
            addEditing: false,
        });

    }

    handleAdd = () => {
        let tempDataSource = _.cloneDeep(this.state.commonConfData);
        // 保证每次只编辑一条数据
        if (!unique(tempDataSource)) return false;

        let newRecord = {
            // name: '',
            // value: '',
            id: tempDataSource.length + 1,
            isEdit: true,
        };
        const { columnsConf } = this.props;
        // 生产新值
        for (let i = 0; i < columnsConf.length; i++) {
            newRecord[columnsConf[i].key] = '';
        }

        tempDataSource.push(newRecord);

        this.setState({
            commonConfData: tempDataSource,
            commonConfDataCache: tempDataSource,
            addEditing: true,
        });
    }

    render() {
        const { commonConfData } = this.state;

        return (
            <div>
                <Button
                    disabled={this.props.relation}
                    onClick={this.handleAdd}
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8 }}
                    icon="plus">
                    添加
                </Button>
                <Table
                    dataSource={commonConfData}
                    rowKey={(record) => record.id}
                    pagination={false}
                    columns={this.renderColumns}
                />
            </div>
        );
    }
}
