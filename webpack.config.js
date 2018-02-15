const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        javascript: './src/app.js',
        html: './index.html'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                API_HOST: JSON.stringify('http://localhost:3000/api')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'flow']
                }
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'], // add 'eslint-loader' to lint on build
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};