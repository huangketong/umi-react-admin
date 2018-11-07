/***
 * @param handleSearch
 * @param formItems [{label: '', key: '', type: '', dict: [{ dict_no: '', dict_name: '' }]}]
 * 
 * *** */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Select, Row, Col, DatePicker } from 'antd';
import { row_style, three_col_layout, one_col_layout,  } from "../../constants/theme";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const SearchForm = ({
    formItems,
    handleSearch,
    form: {
        validateFields,
        getFieldDecorator,
    }
}) => {
    const Length = formItems.length;
    
    const handleOk = () => {
        validateFields((error, values) =>{
            handleSearch(values);
        });
    }

    const renderFormItem = () => {

        return formItems.map((ele, index) => {
            const type = ele.type;
            const label = ele.label;
            const key = ele.key;
            const dict = ele.dict || [];

            switch (type) {
                case "Input":
                    return <Col {...three_col_layout} key={index}>
                        <FormItem label={label}>
                            {getFieldDecorator(`${key}`)(
                                <Input />
                            )}
                        </FormItem>
                    </Col>;
                case "Select":
                    return <Col {...three_col_layout} key={index}>
                        <FormItem label={label}>
                            {getFieldDecorator(`${key}`)(
                                <Select>
                                    {dict.map((item, k) => <Option key={k} value={item.dict_no}>{item.dict_name}</Option>)}
                                </Select>  
                            )}
                        </FormItem>
                    </Col>;
                case "Rangtime":
                    return <Col {...three_col_layout} key={index}>
                        <FormItem label={label}>
                            {getFieldDecorator(`${key}`)(
                                <RangePicker style={{width: '100%'}}/> 
                            )}
                        </FormItem>
                    </Col>
                default: return null;
            }

        })
    }

    return (
        <Form layout="inline" className="filterForm">
            <Row {...row_style}>
                {
                    renderFormItem()
                }
                {
                    (Length % 3 !== 0) ?
                        <Col {...three_col_layout}>
                            <FormItem>
                                <Button
                                    type="primary"
                                    onClick={handleOk}
                                >
                                    查询
                                </Button>
                            </FormItem>
                        </Col> :
                        <Col {...one_col_layout}>
                            <div className="submitButtons">
                                <Button
                                    type="primary"
                                    onClick={handleOk}
                                >
                                    查询
                                </Button>
                            </div>
                        </Col>
                }
            </Row>
        </Form>
    )
}

SearchForm.propTypes = {
    formItems: PropTypes.array,
    handleSearch: PropTypes.func,
}

export default Form.create()(SearchForm);