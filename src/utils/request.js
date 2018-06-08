import axios from 'axios';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

const FETCH_SUCCESS_CODE = 200; // 请求成功的编码
const TOKEN_INVALID_CODE = 401; // token过期的编码
const NET_ERR_CODE = 600; // 网络请求错误的编码

/**
 * 请求函数
 */
export default function request({ method, data, url, headers }) {
    
    // 调用下面封装的fetch函数
    return fetch({ method, data, url, headers }).then((response) => {
        const { statusText, status } = response;
        let data = response.data;
      
        if (Number(status) === FETCH_SUCCESS_CODE) {
            return {
                success: true,
                message: statusText,
                statusCode: status,
                data,
            };
        } else {
            message.error(response.msg);
        }

    }).catch((error) => {
        console.log('fetch =======>error', error);
        const { response } = error;
        let msg;
        let statusCode;

        if (response && response instanceof Object) {
            const { data, statusText } = response;
            statusCode = response.status;
            msg = data.msg || statusText;
            if (Number(statusCode) === TOKEN_INVALID_CODE) {
                msg = '登录过期，请重新登录...';
            }
        } else {
            statusCode = NET_ERR_CODE;
            msg = error.msg || 'Network Error';
        }

        if (Number(statusCode) === TOKEN_INVALID_CODE) {
            localStorage.removeItem('token');
            // browserHistory.push('/login')
            message.error(msg, 2, () => {
                const loginPage = '/login';
                if (loginPage.indexOf(window.location.pathname) < 0) {
                    const from = window.location.pathname;
                    window.location.href = `${window.location.origin}/login?from=${from}`;
                }
            });

        } else {
            message.error(msg);
            return { success: false, statusCode, message: msg };
        }

    });
}

/**
 * 请求
 * url 请求地址
 * method get post put delete patch
 * data 进行
 */
const fetch = ({ method, data, url, headers }) => {
    method = method || 'get';
    const cloneData = lodash.cloneDeep(data);
    /**
   * 对url进行处理
   */
    try {
        let domin = '';
        if (url && url.match(/[a-zA-z]+:\/\/[^/]*/)) {
            // console.log('come in', url.match(/[a-zA-z]+:\/\/[^/]*/))
            domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
            url = url.slice(domin.length);
        }
        const match = pathToRegexp.parse(url);
        url = pathToRegexp.compile(url)(data);
        for (const item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name];
            }
        }
        url = domin + url;
    } catch (e) {
        message.error(e.message);
    }

    /** *
   * 设置请求token
   * ***/
    const AUTH_TOKEN = localStorage.getItem('token');

    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

    if (headers) {
        for (const key in headers) {

            axios.defaults.headers.common[`${key}`] = headers[key];

        }
    }


    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, {
                params: cloneData,
            });
        case 'delete':
            return axios.delete(url, {
                data: cloneData,
            });
        case 'post':
            return axios.post(url, cloneData);
        case 'put':
            return axios.put(url, cloneData);
        case 'patch':
            return axios.patch(url, cloneData);
        default:
            return axios({ method, data, url });
    }
};
