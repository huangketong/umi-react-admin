import { request } from '../../utils';
import * as api from '../../constants/api';

/* 获取任务调度列表*/
export const getDataList = (data) => request({
    url: '',
    method: 'get',
    data,
});

/* 查询任务调度详细*/
export const getSchedulerDetail = (data) => request({
    url: api.schedulerDetailQuery,
    method: 'get',
    data,
});

/* 新增定时任务*/
export const addTask = (data) => request({
    url: api.addTask,
    method: 'post',
    data,
});

/* 修改定时任务*/
export const updateTask = (data) => request({
    url: api.updateTask,
    method: 'post',
    data,
});

/* 审核定时任务*/
export const auditTask = (data) => request({
    url: api.auditTask,
    method: 'post',
    data,
});

/* 删除定时任务*/
export const deleteTask = (data) => request({
    url: api.deleteTask,
    method: 'post',
    data,
});

/* 停用*/
export const disableTask = (data) => request({
    url: api.disableTask,
    method: 'get',
    data,
});

/* 启用*/
export const enableTask = (data) => request({
    url: api.enableTask,
    method: 'get',
    data,
});

/* 立即执行一次任务*/
export const executeTask = (data) => request({
    url: api.executeTask,
    method: 'get',
    data,
});

/* 历史任务分页查询*/
export const hisTask = (data) => request({
    url: api.hisTask,
    method: 'get',
    data,
});
