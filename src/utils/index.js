import lodash from 'lodash';
import request from './request';

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    parent_id
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', parent_id = 'parent_id', children = 'children') => {
    const data = lodash.cloneDeep(array);
    const result = [];
    const hash = {};
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index];
    });

    data.forEach((item) => {
        const hashVP = hash[item[parent_id]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

/**
 * 对路由进行从小到大排序  冒泡排序
 * @param arr [{'id': '1', }] 根据id从小到大 排序 id=>string
 * @return [] 已排序
 * **/
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j].id > arr[j + 1].id) {        // 相邻元素两两对比
                var temp = arr[j + 1];        // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};

export {
    arrayToTree,
    bubbleSort,
    queryURL,
    request,
};
