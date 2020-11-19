// const path = require('path');
//
// const webpack = require('webpack')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// const isProduction = process.env.NODE_ENV === 'production'
//
// module.exports = {
//     // publicPath: 'http://localhost:8000/',
//     baseUrl: './',
//     // baseUrl: 'http://localhost:8000/',
//     assetsDir: "static",
//     productionSourceMap: false,
//     // devServer: {
//     //     // proxy: {
//     //         // '/table': {
//     //         //     target: 'http://localhost:8080/',
//     //         //     changeOrigin: true,
//     //         //     pathRewrite: {
//     //         //         '/': 'http://localhost:8000/'
//     //         //     }
//     //         // },
//     //         // '/ms': {
//     //         //     target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
//     //         //     changeOrigin: true
//     //         // }
//     //     // }
//     // },
//     // configureWebpack: {
//     //     //关闭 webpack 的性能提示
//     //     performance: {
//     //         hints: false
//     //     }
//     //
//     // },
//     devServer: {
//         disableHostCheck: true
//     },
//     configureWebpack: {
//         resolve: {
//             alias: {
//                 '@': path.resolve(__dirname, './src'),
//                 '@i': path.resolve(__dirname, './src/assets'),
//             }
//         },
//         plugins: [
//             new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
//
//             // 下面是下载的插件的配置
//             new CompressionWebpackPlugin({
//                 algorithm: 'gzip',
//                 test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
//                 threshold: 10240,
//                 minRatio: 0.8
//             }),
//             new webpack.optimize.LimitChunkCountPlugin({
//                 maxChunks: 5,
//                 minChunkSize: 100
//             })
//         ]
//     }
// }
// // const path = require('path');
//
// // const webpack = require('webpack')
// // 导入compression-webpack-plugin
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// // 定义压缩文件类型
// const productionGzipExtensions = ['js', 'css']
// // const isProduction = process.env.NODE_ENV === 'production'
//
// module.exports = {
//     // publicPath: './',
//     baseUrl: process.env.NODE_ENV === "production"?"./":"/", //font scss资源路径 不同环境切换控制,
//     // baseUrl: process.env.NODE_ENV === "production" ? "/static/" : "/", //font scss资源路径 不同环境切换控制,
//     assetsDir: "static",
//     productionSourceMap:false,
//     //统一配置打包插件
//     configureWebpack: {
//         externals: {
//             'vue': 'Vue',
//             'element-ui': 'ELEMENT',
//             'vuex': 'Vuex',
//             'axios': 'axios',
//             'echarts': 'echarts',
//         },
//         plugins: [
//             new CompressionWebpackPlugin({
//                 filename: '[path].gz[query]',
//                 algorithm: 'gzip',
//                 test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
//                 threshold: 10240,//对10K以上的数据进行压缩
//                 minRatio: 0.8,
//                 deleteOriginalAssets: false,//是否删除源文件
//             })
//         ]
//     },
// }
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// module.exports={
//     configureWebpack:config =>{
//         return {
//             plugins:[
//                 new BundleAnalyzerPlugin()
//             ]
//         }
//     }
// }
module.exports = {
    // publicPath: 'http://localhost:8000/',
    baseUrl: './',
    // baseUrl: 'http://localhost:8000/',
    assetsDir: "static",
    productionSourceMap: false,
    devServer: {
        // proxy: {
        // '/table': {
        //     target: 'http://localhost:8080/',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '/': 'http://localhost:8000/'
        //     }
        // },
        // '/ms': {
        //     target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
        //     changeOrigin: true
        // }
        // }
    },
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints: false
        },
        plugins:[
            new BundleAnalyzerPlugin()
        ],
        externals: {
            'element-ui': 'ELEMENT',
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'echarts': 'echarts',
        },
    }
}
