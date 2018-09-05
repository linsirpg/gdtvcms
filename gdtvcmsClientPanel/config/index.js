// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../balanceServer/app/public/admin/index.html'),
    assetsRoot: path.resolve(__dirname, '../../balanceServer/app/public/admin'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/admin/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/api': '/api' }
        },
        '/server': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/server': '/server' }
        },
        '/describe': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/describe': '/describe' }
        },
        '/articleinfo': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/articleinfo': '/articleinfo' }
        },
        '/presetproduct':{
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/presetproduct': '/presetproduct' }
        },
        '/public':{
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/public': '/public' }
        },

        '/productlist':{
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/productlist': '/productlist' }
        },
        '/shophome':{
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/shophome': '/shophome' }
        },
        '/statistics':{
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/statistics': '/statistics' }
        },         
    },
    
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
