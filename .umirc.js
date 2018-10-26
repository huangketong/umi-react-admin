import os from 'os';

const routes = [
    {
        path: "/",
        component: "./layouts/index",
        routes: [
            { path: "/", component: "./index.js" },
            { path: "/dashboard", component: "./dashboard" },
            { path: "/login", component: "/login" },
            { path: "/scheduler", component: "/scheduler" }
        ]
    }
];

export default {
    publicPath: "/",
    disableCSSModules: false,
    define: {
        "process.env.API_ENV": process.env.API_ENV
    },
    urlLoaderExcludes: [/\.svg$/],
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    routes: routes,
    targets: { ie: 9 },
    hash: true,
    plugins: [
        [
            "umi-plugin-react",
            {
                dva: {
                    hmr: true,
                },
                antd: true,
                routes: {
                    exclude: [
                        /model\.(j|t)sx?$/,
                        /service\.(j|t)sx?$/,
                        /models\//,
                        /components\//,
                        /services\//
                    ]
                },
                locale: {
                    enable: true, // default false
                    default: 'zh-CN', // default zh-CN
                    baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
                },
                dynamicImport: {
                    webpackChunkName: true,
                    loadingComponent: "./PageLoadingComponent.js"
                },
                dll: {
                    include: ["dva", "dva/router", "dva/saga", "dva/fetch"],
                    exclude: ["@babel/runtime"]
                },
                hardSource: os.platform() === 'darwin',
            }
        ]
    ],
    alias: {
        components: `${__dirname}/src/components`,
        utils: `${__dirname}/src/utils`,
    },
    chainWebpack(config) {
        config.module
            .rule("svg")
            .test(/\.svg$/i)
            .use("svg-sprite-loader")
            .loader(require.resolve("svg-sprite-loader"));
    },
    theme: "./theme-config.js"
};
