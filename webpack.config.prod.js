const path = require('path');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: {
        javascript: './src/app.js',
        html: './index.html'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                API_HOST: JSON.stringify('https://wtalk.herokuapp.com/api'),
                WS_ADDRESS: JSON.stringify('wss://wtalk.herokuapp.com'),
            }
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es', 'ru'],
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader', // add 'eslint-loader' to lint on build
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            }
        ]
    }
};
