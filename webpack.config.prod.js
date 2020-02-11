const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                API_HOST: JSON.stringify('https://wtalk.herokuapp.com/api'),
                WS_ADDRESS: JSON.stringify('wss://wtalk.herokuapp.com'),
            }
        })
    ]
});







/*
const path = require('path');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const packageJson = require("./package.json");

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: {
        javascript: './src/index.js',
        html: './index.html'
    },
    output: {
        filename: "[name].js",
        chunkFilename: `[name].chunk.${packageJson.version}.js`,
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
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
                        presets: ['@babel/env', '@babel/react'],
                        plugins: ['@babel/syntax-dynamic-import']
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
*/
