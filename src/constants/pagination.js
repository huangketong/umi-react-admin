/**
 * ****公共的分页器****
 * @param total 后端返回的总条数
 * @param parameters {Object} 参数
 * @param dispatch
 * @param updateParamsAction 更新对应参数
 * @param queryAction {Function} action创建函数
 */
export const paginationConfig = (total, parameters, dispatch, queryAction, updateParamsAction) => {
    const {
        current_page,
        page_size,
    } = parameters;
    return {
        current: current_page,
        showSizeChanger: true,
        total,
        defaultPageSize: page_size,
        showQuickJumper: true,
        // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        onShowSizeChange: (current, size) => {
            const newParams = {
                ...parameters,
                current_page: 1,
                page_size: size,
            };
            /**
             * dispatch action
             */
            dispatch({
                type: updateParamsAction,
                payload: newParams,
            });
            dispatch({
                type: queryAction,
                payload: newParams,
            });
        },
        onChange: (current) => {
            // 增加对current的判断，用于区别columns的 filters 中所触发的onChange事件
            // 只有改变了current_page的时候才去做fetch请求数据
            if (current !== current_page) {
                const newParams = {
                    ...parameters,
                    current_page: current,
                };
                /**
                 * dispatch action
                 */
                dispatch({
                    type: updateParamsAction,
                    payload: newParams,
                });
                dispatch({
                    type: queryAction,
                    payload: newParams,
                });
            }
        },
    };
};
