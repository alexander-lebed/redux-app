const path = require('path');

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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};