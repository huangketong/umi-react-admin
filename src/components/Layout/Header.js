import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


const MyHeader = ({
    logout,
    userName,
}) => {

    let handleClickMenu = function(e) {
        if (e.key === 'logout') {
            logout();
        } 
    };

    return (
        <Menu mode="horizontal" onClick={handleClickMenu}>
            <SubMenu style={{
                float: 'right',
            }} title={<span> <Icon type="user" />
                {userName} </span>}>
                {/* <Menu.Item key="changePWD">
                    修改密码
                </Menu.Item> */}
                <Menu.Item key="logout">
                    登出
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

MyHeader.propTypes = {
    logout: PropTypes.func,
};

export default MyHeader;
