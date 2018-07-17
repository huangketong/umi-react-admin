const APIV_DEV = '';  // 开发环境的阿里云接口
const APIV_TEST = ''; // 测试环境的阿里云接口
const APIV_PROD = ''; // 生产环境的阿里云接口
let API_GATEWAY = '';
const API_MOCK = 'http://localhost:8899';

if (process.env.NODE_ENV !== 'production') { // 开发环境
    console.log('now environment is dev');
    API_GATEWAY = API_MOCK;
} else if (process.env.NODE_ENV === 'production') { // npm run build 路径
    if (process.env.API_ENV === 'test') { // 构建测试环境代码
        console.log('**test_code**');
        API_GATEWAY = APIV_TEST;
    } else if (process.env.API_ENV === 'prod') { // 构建生产环境代码
        console.log('**prod_code**');
        API_GATEWAY = APIV_PROD;
    }
}

module.exports = {
    user_login: `${API_GATEWAY}/api/account/v2/login`,
    user_logout: `${API_GATEWAY}/api/account/v2/logout`,
};
