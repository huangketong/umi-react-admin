import {
    getDataList, getSchedulerDetail,
    addTask, updateTask, auditTask,
    disableTask, enableTask, executeTask,
    hisTask, deleteTask,
} from './service';
import { PAGINATION_PARAMS } from '../../constants/common';
import { message } from 'antd';

export default {
    namespace: 'scheduler',
    state: {
        parameters: {
            ...PAGINATION_PARAMS,
            task_key: '', // 任务编码
            task_type: '', // 任务类型
            belong_system: '', // 归属系统
        },
        total: 0,
        list: [],

        detailInfo: {}, // 详细信息
        isEdit: false,
        isApprove: false,
        cancelApprove: false,
        hisList: [], // 历史任务列表
        hisTotal: 0, // 历史任务总数
        visible: false, // 模态框
        changeRecord: {}, // 待修改的数据
        hisParams: {
            id: '',
            ...PAGINATION_PARAMS,
        },
        calledRow: {},
        expandedRowKey: [],
        selectedRows: [],
        selectedRowKeys: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/scheduler') {
                    console.log('/scheduler');
                }
            });
        },
    },
    effects: {
        *getDataList({ payload }, { call, put }) {
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
        *queryDetail({ payload }, { call, put }) {
            const data = yield call(getSchedulerDetail, payload);
            if (data && data.success) {
                yield put({
                    type: 'updateState',
                    payload: {
                        changeRecord: data,
                        properties: data.properties,
                    },
                });
            }
        },
        *addTask({ payload }, { put, select }) {
            const params = yield select((state) => state.scheduler.parameters);
            const data = yield addTask(payload);
            if (data && data.flag) {
                message.success('保存成功！', 2);
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false,
                        changeRecord: {},
                    },
                });

                // 刷新列表
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                    },
                });
            } else {
                message.warning(data.remark);
            }
        },
        *updateTask({ payload }, { put, select }) {
            const params = yield select((state) => state.scheduler.parameters);
            const data = yield updateTask(payload);
            if (data && data.flag) {
                message.success('修改成功！', 2);
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false,
                        changeRecord: {},
                        properties: [],
                    },
                });
                // 刷新列表
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                    },
                });
            }
        },
        *auditTask({ payload }, { put, select }) {
            const params = yield select((state) => state.scheduler.parameters);
            const data = yield auditTask(payload);
            if (data && data.flag) {
                message.success('审核成功！', 2);
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false,
                        changeRecord: {},
                        isApprove: false,
                        cancelApprove: false,
                        properties: [],
                    },
                });
                // 刷新列表
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                    },
                });
            }
        },
        *deleteTask({ payload }, { put, select }) {
            const params = yield select((state) => state.scheduler.parameters);
            const data = yield deleteTask(payload);
            if (data && data.flag) {
                message.success('删除成功！', 2);
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false,
                        changeRecord: {},
                    },
                });

                // 刷新列表
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                    },
                });
            } else {
                message.warning(data.remark);
            }
        },

        *disableTask({ payload }, { call, select, put }) {
            const params = yield select((state) => state.scheduler.parameters);
            const data = yield call(disableTask, payload);
            if (data && data.success) {
                message.success('任务停用成功', 2);
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                    },
                });
            }
        },
        *enableTask({ payload }, { call, select, put }) {
            const data = yield call(enableTask, payload);
            if (data && data.success) {
                message.success('任务启用成功', 2);
                const params = yield select((state) => state.scheduler.parameters);
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                    },
                });
            }
        },
        *executeTask({ payload }, { call, put, select }) {
            const params = yield select((state) => state.scheduler.parameters);
            const data = yield call(executeTask, payload);
            if (data && data.success) {
                message.success('立即执行一次操作成功', 2);
                yield put({
                    type: 'queryList',
                    payload: {
                        ...params,
                        org_code: params.org_code || null,
                        product_code: params.product_code || null,
                        task_key: params.task_key || null,
                        task_type: params.task_type || null,
                        belong_system: params.belong_system || null,
                    },
                });
            }
        },
        *queryHisTask({ payload }, { call, put }) {
            const data = yield call(hisTask, payload);
            if (data && data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        hisList: data.list,
                        hisTotal: data.total,
                    },
                });
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
        updateParameters(state, { payload }) {
            return {
                ...state,
                parameters: payload,
            };
        },
        updatePaginationHisParams(state, { payload }) {
            return {
                ...state,
                hisParams: payload,
            };
        },
    },
};
