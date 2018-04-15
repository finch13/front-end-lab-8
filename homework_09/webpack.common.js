const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'bin')
};

module.exports = {
    entry: PATHS.source + '/app.js',
    plugins: [
        new CleanWebpackPlugin(['bin']),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: PATHS.source + '/app.html'
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    output: {
        path: PATHS.build,
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/'),
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: { sourceMap: false }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: false }
                    }]
                })
            }
        ]
    }
};