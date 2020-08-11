var { merge } = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var commonConfig = require('./webpack.common.js');
// You can change this part to try out both with angular-template-loader or
//  @ngtools/webpack
var commonConfig = require('./ngtools-webpack.js');
var helpers = require('./config/helpers.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[hash].chunk.js'
  },


  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    port: 4202,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
});