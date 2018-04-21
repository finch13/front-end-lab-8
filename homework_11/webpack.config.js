const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/js/output-module.js",
    plugins: [
        new HtmlWebpackPlugin({
            title: "JS-Modules",
            template: "./src/index.html"
        }),
        new ExtractTextPlugin('style.css')
    ],
    output: {
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            }
        ]
    },
    watch: true
}