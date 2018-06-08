import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less';
const FormItem = Form.Item;


const Login = ({
    loading, dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
    },
}) => {

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            dispatch({ type: 'login/login', payload: values });
        });
    }

    return (
        <div className={styles.form}>
            {/* <div className={styles.logo}>
                <img alt={'logo'} src={require('../../assets/bangsheng.png')} />
                <span>{config.name}</span>
            </div> */}
            
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator('account', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                        size="large"
                        onPressEnter={handleOk}
                        placeholder="用户名"
                    />)}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input
                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                        size="large" type="password"
                        onPressEnter={handleOk} placeholder="密码"
                    />)}
                </FormItem>
                <Button type="primary" size="large" onClick={handleOk} loading={loading.effects['login/login']}>
                    登录
                </Button>
                <p>
                    <span>建议请使用chrome浏览器登录</span>
                </p>
            </form>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
    form: PropTypes.object,
};

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login));
