var {merge} = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var commonConfig = require('./webpack.common.js');
var commonConfig = require('./ngtools-webpack.js');
var helpers = require('./config/helpers.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { Externals } = require('share-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    library: 'extapp',
    libraryTarget: 'umd'
  },
  externals: [
    Externals({
      namespace: 'ext-app',
      modules: [/@angular/]
    })
  ],
  devServer: {
    historyApiFallback: {
        index: 'dist/index.html'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/index.html'
    }),
  ]
});