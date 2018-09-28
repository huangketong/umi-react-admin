import { logout } from '../../services/app';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'app',
    state: {
        text: 'my umi+dva',
        collapsed: false,
        activeKey: '',
        activeRoute: '',
        navOpenKeys: JSON.parse(localStorage.getItem("navOpenKeys")) || [],
        userName: '',
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({
                type: 'query',
                payload: {},
            });
        },
    },
    effects: {
        *query({payload}, { put }) {
            // 确认用户是否登录---尝试获取登录留下的token
            const token = localStorage.getItem('token');
            const userName = localStorage.getItem('userName');
            yield put({type: 'updateState', payload: {userName: userName}});
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
                ...payload,
            };
        },
    },
};
