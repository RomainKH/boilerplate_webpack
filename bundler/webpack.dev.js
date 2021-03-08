const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins:
        [
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer:
        {
            contentBase: './dist',
            open: true,
            hot: true
        },
    }
)