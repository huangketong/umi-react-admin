// antd Row组件的样式
const row_style = {
    gutter: {
        md: 8, lg: 24, xl: 48,
    },
};
// antd Row组件的样式
const row_gutter = {
    gutter: {
        md: 8, lg: 24, xl: 48,
    },
};

// antd Col组件有一列的布局
const one_col_layout = {
    sm: {
        span: 24,
    },
    md: {
        span: 24,
    },
};
// antd Col组件有两列的布局
const two_col_layout = {
    sm: {
        span: 24,
    },
    md: {
        span: 12,
    },
};
// antd Col组件有三列的布局
const three_col_layout = {
    sm: {
        span: 24,
    },
    md: {
        span: 8,
    },
};
// antd Col组件有四列的布局
const four_col_layout = {
    sm: {
        span: 24,
    },
    md: {
        span: 6,
    },
};
// antd FormItem组件的布局
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
        md: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
    },
};

// antd FormItem组件的布局
const oneColFormItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
        md: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 19 },
        md: { span: 20 },
    },
};

const verticalFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
    },
};

const modalOneColFormItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
module.exports = {
    row_style,
    row_gutter,
    one_col_layout,
    two_col_layout,
    three_col_layout,
    four_col_layout,
    formItemLayout,
    oneColFormItemLayout,
    modalOneColFormItemLayout,
    verticalFormItemLayout,
};
