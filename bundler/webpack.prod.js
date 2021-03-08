const Merge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = Merge(
    commonConfiguration,
    {
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
              new CssMinimizerPlugin(),
              new TerserPlugin()
            ],
        }
    }
)