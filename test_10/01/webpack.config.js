let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

let config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                //当遇到.gif、.png、.ttf等格式文件时，url-loader会把它们一起编译到dist目录下;
                // "?limit=1024"是指如果这个文件小于1kb，就以base64的形式加载，不会生成一个文件。
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    plugins: [
        //重命名提取后的css文件
        new ExtractTextPlugin("main.css"),
        new VueLoaderPlugin()
    ]
};

module.exports = config;
