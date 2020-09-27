import React from "react";
import PropTypes from "prop-types";
import { Button, Tree, Modal, Icon, Radio } from "antd";
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;

class Demo extends React.Component {
    static propTypes = {
        // status: PropTypes.oneOfType([
        //     PropTypes.string,
        //     PropTypes.bool,
        // ]),
        treeData: PropTypes.array,
    };
    state = {
        visible: false,
        value: 1,
    };

    renderTreeNodes = (data) =>
        data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    /**
     * 递归查找target节点的父节点
     */
    findParentNode = (target) => {
        let parentNode = null;
        let strArr = target.split('-');
        const length = strArr.length;
        if (length === 2) {
            parentNode = null;
        } else {
            strArr.length = length - 1;
            parentNode = strArr.join('-');
        }
        return parentNode;
    }

    onSelect = (value, e) => {
        const targetValue = value[0];

        if (targetValue) {
            const parentValue = this.findParentNode(targetValue);
            console.log(parentValue);
            this.setState({
                visible: true,
            });
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleOk = () => {};

    onChange = (e) => {
        console.log("radio checked", e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    componentWillReceiveProps(nextProps, nextState) {
      console.log(nextProps, nextState)
      console.log(this.props.text)
      // if(this.props.text !== nextProps.text) {
      //   this.setState({
      //     visible: true,
      //   });
      // }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   if(this.props.text === nextProps.text) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }

    render() {
        const { visible } = this.state;
        const { treeData, text } = this.props;

        console.log('text****', text)

        return (
            <div>
                <Tree
                    defaultExpandAll={false}
                    onSelect={this.onSelect}
                    showLine={true}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
                {visible && (
                    <Modal
                        title="请选择你要进行的操作"
                        visible={visible}
                        onCancel={this.handleCancel}
                        onOk={this.handleOk}
                    >
                        <RadioGroup
                            onChange={this.onChange}
                            value={this.state.value}
                        >
                            <Radio value={1}>编辑</Radio>
                            <Radio value={2}>删除</Radio>
                            <Radio value={3}>新增子节点</Radio>
                        </RadioGroup>
                    </Modal>
                )}
            </div>
        );
    }
}

export default Demo;
