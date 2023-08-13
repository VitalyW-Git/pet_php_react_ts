const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const ruleForAssets = {
    type: 'asset',
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
}

const rules = [ruleForAssets]
module.exports = {
    entry:  path.resolve(__dirname, '../src/index.tsx'),
    context: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../../www/assets'),
        filename: '[name].js',
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: { rules },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}