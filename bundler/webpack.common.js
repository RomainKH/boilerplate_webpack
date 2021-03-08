const path = require('path')
const json5 = require('json5')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        homepage: './src/scripts/index.js',
        exemple: './src/scripts/exemple.js'
    },
    output:
    {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    plugins:
    [
        new MiniCssExtractPlugin({
            filename: '[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'static'}
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            minify: true,
            template: path.resolve(__dirname, '../src/index.html'),
            chunks: ['homepage']
        }),
        new HtmlWebpackPlugin({
            filename: 'exemple.html',
            minify: true,
            template: path.resolve(__dirname, '../src/pages/exemple.html'),
            chunks: ['exemple']
        })
    ],
    optimization: {
        runtimeChunk: 'single',
    },
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
                
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                use:
                [
                    'html-loader'
                ]
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                  parse: json5.parse,
                },
            },
        ]
    }
}