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
                NODE_ENV: JSON.stringify('production'),
                API_HOST: JSON.stringify('https://gorodovoy.herokuapp.com/api')
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
                    presets: ['env', 'react', 'flow']
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
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};