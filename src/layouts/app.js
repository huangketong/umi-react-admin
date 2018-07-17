import React from 'react';
import withRouter from 'umi/withRouter';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { connect } from 'dva';
import { Layout } from 'antd';
import { MyLayout } from '../components';
import { menus } from '../utils/menus';
import pathToRegexp from 'path-to-regexp';
import styles from './app.less';
import { footerText, adminName } from '../constants/common';
const { Header, Content, Footer, Sider } = Layout;
const { Menu, MyHeader } = MyLayout;


let lastHref;

const App = ({
    app, dispatch, children, loading,
}) => {
    const {
        navOpenKeys,
        activeKey,
        userName,
    } = app;

    const { href, pathname } = window.location;
    const pathName = pathname.startsWith('/') ? pathname : `/${pathname}`;
    let current = menus.find(((item) => pathToRegexp(item.route || '').exec(pathName)));

    if (lastHref !== href) {
        NProgress.start();
        if (!loading.global) {
            NProgress.done();
            lastHref = href;
        }
    }

    const handleClicksideMenu = (key) => {
        for (let item of menus) {
            if (item.id === key.key && item.root_id !== '0') {
                let activeKey = key.key;
                let activeRoute = item.route;
                dispatch({
                    type: 'app/updateState',
                    payload: {
                        activeKey: activeKey,
                        activeRoute: activeRoute,
                    },
                });
            }
        }
    };

    const menusProps = {
        sideMenu: menus,
        handleClicksideMenu,
        navOpenKeys,
        activeKey: current ? current.id : activeKey,
        changeOpenKeys(openKeys) {
            localStorage.setItem("navOpenKeys", JSON.stringify(openKeys));
            dispatch({ type: 'app/updateState', payload: { navOpenKeys: openKeys } });
        },
    };


    const MyHeaderProps = {
        logout() {
            dispatch({ type: 'app/logout', payload: { account: 'user' } });
        },
        userName,
    };

    // 如果是要渲染鞥路页面的话就不在渲染Layout
    const isLoginPage = '/login';
    if (isLoginPage.includes(pathname)) {
        return (<div>
            {children}
        </div>);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className={styles.logo} >{adminName}</div>
                <Menu {...menusProps} />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} >
                    <MyHeader {...MyHeaderProps} />
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 460 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    {footerText}
                </Footer>
            </Layout>
        </Layout>
    );
};

App.propTypes = {
    app: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
    children: PropTypes.element.isRequired,
};

export default withRouter(connect((({ app, loading }) => ({ app, loading })))(App));
