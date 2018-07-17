import { getDataList } from './service';
import { PAGINATION_PARAMS } from '../../constants/common';
import { stat } from 'fs';

export default {
    namespace: 'scheduler',
    state: {
        parameters: {
            ...PAGINATION_PARAMS,
            system: '',
            task_code: '',
        },
        total: 0,
        list: [],
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen((location) => {
                if (location.pathname === '/scheduler') {
                    console.log('/scheduler');
                }
            });
        },
    },
    effects: {
        *getDataList({payload}, {call, put}) {
            const data = yield call(getDataList, payload);
            if (data && data.success) {
                yield put({
                    type: 'updateState',
                    payload: {
                        list: data.datas || [],
                        total: data.total || 0,
                        parameters: payload,
                    },
                });
            }
        },
    },
    reducers: {
        updateState(state, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
        updateParameters(state, {payload}) {
            return {
                ...state,
                parameters: payload,
            };
        },
    },
};
