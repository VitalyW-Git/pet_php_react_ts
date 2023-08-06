const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const ruleForStyles = {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
}

const ruleForStylesScss = {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
    ],
}

const ruleForJavascript = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
}


const rules = [ruleForJavascript, ruleForStyles, ruleForStylesScss]

/** @type {import('webpack').Configuration} */
const prodConfig = {
    mode: 'production',
    module: { rules },
    devtool: 'source-map',
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WebpackBar(),
    ],
}

module.exports = merge(common, prodConfig)