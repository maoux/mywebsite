const webpack = require("webpack")
const path = require("path")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = process.env.NODE_ENV && process.env.NODE_ENV === 'production'

let config = {
    mode: 'development',
    entry: path.join(__dirname, 'src/main.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
        }, {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            output: __dirname + '/dist',
            inject: 'head'
        }),
        new CopyWebpackPlugin([{
                from: path.join(__dirname, "src/assets"),
                to: path.join(__dirname, 'dist/assets'),
                cache: prod
            }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true,
        port: 3000
    },
    devtool: 'eval-source-map'
}

module.exports = config

if (module.hot)
  module.hot.accept()

if (prod) {
    module.exports.plugins.push(
        new UglifyJSPlugin(),
        new OptimizeCSSAssets()
    )
}