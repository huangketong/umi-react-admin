
### 技术栈简介

- [antd](https://ant.design/index-cn) 负责UI
- [dva](https://github.com/dvajs/dva) 负责状态和数据流控制
- [umi](https://umijs.org/guide/) UmiJS 是一个类 Next.JS 的 react 开发框架




### 开发和构建

#### 开发
```
    git clone https://github.com/huangketong/umi-react-admin
    cd umi-react-admin
    npm install 
    npm run dev
```
浏览器打开 `http://localhost:8899/`

### 目录结构
```
|- dist 打包编译后的项目
|- mock mock的接口
|- node_module node依赖
|- src 
  |- assets 资源文件
  |- component 封装的组件
  |- constants 
    |- api 请求api配置
    |- common.js 公共分页
    |- dict.js 字典配置
    |- pagination.js 分页器生成器，配合table使用
    |- theme.js 样式
  |- pages 项目的页面文件
    |- dashboard 首页
    |- layouts 页面整体布局
    |- login 登录界面
    |- overview 首页
    |- scheduler 任务调度
    |- 404.js 404页面
    |- document.ejs html模板
    |- index.js 路由重定向
  |- services 具体网络请求
  |- utils 工具
    |- request.js 网络请求
    |- downRequest.js 导出文件的请求处理
    |- index.js 常用工具
    |- menus.js 自己模拟的侧边菜单
  |- global.js 可以在这里加入 polyfill
  |- global.less 约定的全局样式文件，自动引入
  |- PageLoadingComponent.js 
|- .umirc.js umi 配置
|- .umirc.mock.js 配合umi的mock入口
|- package.json npm包管理
|- theme-config.js 配置项目的antd主题
```