let ExtractTextPlugin = require('extract-text-webpack-plugin');

let path = require('path');

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
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        //重命名提取后的css文件
        new ExtractTextPlugin("main.css")
    ]
};

module.exports = config;
