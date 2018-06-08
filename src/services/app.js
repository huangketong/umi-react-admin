import { request } from '../utils';
import api from '../constants/api';

export const logout = (params) => request({
    url: api.user_logout,
    method: 'post',
    data: params,
});
