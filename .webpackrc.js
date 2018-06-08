export default {
    theme: './theme-config.js',
    publicPath: '/static/',
    disableCSSModules: false,
    define: {
        'process.env.API_ENV': process.env.API_ENV,
    },
}