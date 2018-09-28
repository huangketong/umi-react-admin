import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { arrayToTree, bubbleSort } from "../../utils";
const SubMenu = Menu.SubMenu;

// import Iconfont from '../Iconfont';
// import './icon'; // 引入自己设计的菜单icon

const Menus = ({
    handleClicksideMenu,
    navOpenKeys,
    changeOpenKeys,
    sideMenu,
    activeKey
}) => {
    const menuTree = arrayToTree(bubbleSort(sideMenu));
    const levelMap = {};

    // 递归生成菜单
    const getMenus = menuTreeN => {
        if (menuTreeN) {
            return menuTreeN.map(item => {
                if (item.show_side) {
                    if (item.children) {
                        if (item.parent_id) {
                            levelMap[item.id] = item.parent_id;
                        }
                        return (
                            <SubMenu
                                key={item.id}
                                title={
                                    <span>
                                        {item.icon_id && (
                                            <Icon type={item.icon_id} />
                                        )}
                                        {item.name}
                                    </span>
                                }
                            >
                                {getMenus(item.children)}
                            </SubMenu>
                        );
                    }
                    return (
                        <Menu.Item key={item.id}>
                            <Link to={item.route}>
                                {item.icon_id &&
                                    item.level === "1" && (
                                        <Icon type={item.icon_id} />
                                    )}
                                {item.name}
                            </Link>
                        </Menu.Item>
                    );
                }
            });
        }
    };
    const menuItems = getMenus(menuTree);
    // 保持选中
    const getAncestorKeys = key => {
        let map = {};
        const getParent = index => {
            const result = [String(levelMap[index])];
            if (levelMap[result[0]]) {
                result.unshift(getParent(result[0])[0]);
            }
            return result;
        };
        for (let index in levelMap) {
            if ({}.hasOwnProperty.call(levelMap, index)) {
                map[index] = getParent(index);
            }
        }
        return map[key] || [];
    };

    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key));
        const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key));
        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = getAncestorKeys(latestCloseKey);
        }
        changeOpenKeys(nextOpenKeys);
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            onClick={handleClicksideMenu}
            selectedKeys={[activeKey]}
            onOpenChange={onOpenChange}
            openKeys={navOpenKeys}
        >
            {menuItems}
        </Menu>
    );
};

Menus.propTypes = {
    sideMenu: PropTypes.array,
    handleClicksideMenu: PropTypes.func,
    navOpenKeys: PropTypes.array,
    changeOpenKeys: PropTypes.func
};

export default Menus;
