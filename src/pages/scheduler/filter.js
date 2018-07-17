import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { row_style, three_col_layout } from '../../constants/theme';
const FormItem = Form.Item;
const Option = Select.Option;

const Filter = ({
    dispatch,
    form: {
        getFieldDecorator,
        getFieldsValue,
    },
    parameters,
}) => {

    const handleSearch = () => {
        const params = getFieldsValue();
        dispatch({
            type: 'scheduler/getDataList',
            payload: {
                ...parameters,
                ...params,
                current_page: 1,
            },
        });
    };

    return (
        <Form className='filterForm' layout='inline'>
            <Row {...row_style}>
                <Col {...three_col_layout}>
                    <FormItem label='归属系统'>
                        {getFieldDecorator('system')(
                            <Select style={{ width: '100%' }}>
                                <Option value='a'>aaa</Option>
                                <Option value='b'>bbb</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col {...three_col_layout}>
                    <FormItem label='任务编码'>
                        {getFieldDecorator('task_code')(
                            <Input style={{ width: '100%' }} />
                        )}
                    </FormItem>
                </Col>
                <Col {...three_col_layout}>
                    <FormItem>
                        <Button type='primary' onClick={handleSearch}>查询</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    );
};

export default Form.create()(Filter);
