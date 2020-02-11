const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const packageJson = require("./package.json");

module.exports = {
    context: __dirname,
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
        new MomentLocalesPlugin({
            localesToKeep: ['es', 'ru'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
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
                    {
                        loader: "sass-loader",
                        options: {
                            importer: globImporter()
                        }
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            }
        ]
    },
};
