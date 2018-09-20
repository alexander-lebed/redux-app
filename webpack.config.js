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
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'flow']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // add 'eslint-loader' to lint on build
                use: 'babel-loader'
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
