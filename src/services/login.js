import { request } from '../utils';
import { user_login } from '../constants/api';

export const login = (data) => request({
    url: user_login,
    method: 'post',
    data,
});
