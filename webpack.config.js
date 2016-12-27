var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    //插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.UglifyJsPlugin()
    ],
    //页面入口文件配置
    entry: {
        main: path.resolve(__dirname, './app/main.js'),
    },
    //出口文件输出配置
    output: {
        path: path.resolve(__dirname, './build/js/'),
        filename: '[name].min.js',
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.sass$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.json$/, loader: 'json-loader'},
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react']
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'M:/HB_pro/react_webpack/app', //绝对路径
        extensions: ['', '.js', '.json', '.sass','.jsx'],
        alias: {
            
        }
    }
};