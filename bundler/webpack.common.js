const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')

module.exports = {
    devtool: 'source-map',
    devServer: 
    {
        contentBase: './dist',
        open: true,
        hot: true
    },
    entry: {
        homepage: [
            './src/scripts/index.js',
            './src/styles/app.styl'
        ],
        exemple: [
            './src/scripts/exemple.js',
            './src/styles/app.styl'
        ]
    },
    output:
    {
        filename: 'bundle.[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins:
    [
        new CopyWebpackPlugin([{from: 'static'}]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            minify: true,
            template: path.resolve(__dirname, '../src/index.html'),
            chunks: ['homepage']
        }),
        new HtmlWebpackPlugin({
            filename: './pages/exemple.html',
            minify: true,
            template: path.resolve(__dirname, '../src/pages/exemple.html'),
            chunks: ['exemple']
        }),
        new HtmlWebpackExcludeAssetsPlugin(),

    ],
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
                test: /\.(jpg|png|svg|gif)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2|woff|otf|eot|ttf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:
                [
                    'html-loader'
                ]
            }
        ]
    }
}