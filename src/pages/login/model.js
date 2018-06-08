import * as loginService from '../../services/login';
import { routerRedux } from 'dva/router';
import { queryURL } from '../../utils';

export default {
    namespace: 'login',
    state: {
        userName: '',
    },

    effects: {
        *login({ payload }, { put }) {
            const data = yield loginService.login(payload);

            if (data.success) {
                // 登录成功后把 token 保存下来
                const token = data.token;
                // yield put({type: 'updateState', payload: {userName: data}})
                localStorage.setItem('token', token);

                const from = queryURL('from');
                yield put({ type: 'app/query' });

                if (from) {
                    yield put(routerRedux.push({pathname: from}));
                } else {
                    yield put(routerRedux.push({pathname: '/dashboard'}));
                }
            }

        },

    },
    reducers: {
        updateStates(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
