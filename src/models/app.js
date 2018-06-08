import { logout } from '../services/app';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'app',
    state: {
        text: 'my umi+dva',
        collapsed: false,
        activeKey: '',
        activeRoute: '',
        navOpenKeys: JSON.parse(localStorage.getItem("navOpenKeys")) || [],
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({
                type: 'query',
            });
        },
    },
    effects: {
        *query({ put }) {
            // 确认用户是否登录---尝试获取登录留下的token
            let token = localStorage.getItem('token');
            const location = window.location; 
            if ( token) {
                if (location.pathname === '/login') {
                    yield put(routerRedux.push({pathname: '/dashboard'}));
                }
            } else {
                const loginPage = '/login';
                if (loginPage.indexOf(location.pathname) < 0) {
                    const from = location.pathname;
                    window.location.href = `${location.origin}/login?from=${from}`;
                }
            }
        },
        *logout({ payload }, { put, call }) {
            const data = yield call(logout, payload);

            localStorage.removeItem('token');
            if (data.success) {
                yield put({ type: 'query' });
            } else {
                throw (data);
            }
        }, 
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}