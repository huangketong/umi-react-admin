/**
 * 导出/下载 表格数据
 * @augments { data, url, method }
 * @returns {blob}
 * **/

import axios from 'axios';
import { prefix } from 'config';
import { message } from 'antd';
import { EXPORT_FAIL } from '../constants/prompt';

function downRequest({ data, url, method }) {
    // 获取token
    const AUTH_TOKEN = localStorage.getItem(`${prefix}token`);

    return axios({
        method: method || 'get',
        url: url,
        headers: {
            "Authorization": AUTH_TOKEN,
            // "Content-Type": "application/x-xls",
            "Content-Type": "octets/stream; charset=utf-8",
        },
        params: data,
        responseType: "blob",
    })
        .then((Response) => Response.data)
        .catch((error) => { message.error(EXPORT_FAIL), console.log(error); });
}

const downFile = (data, fileName) => {
    // 把Java返回的 stream 格式统一转为 application/x-xls
    const blob = new Blob([data], { type: "application/x-xls" }); // application/vnd.ms-excel

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.target = '_blank';
        link.click();
        window.URL.revokeObjectURL(link.href);
        // const href = window.URL.createObjectURL(blob);
        // window.location.href = href;
    }
};

module.exports = {
    downRequest,
    downFile,
};

