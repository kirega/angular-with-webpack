const path = require('path');
const webpack = require('webpack');
var helpers = require('./config/helpers.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
    },
    // output: {
    //     path: helpers.root('dist/aot'),
    //     publicPath: '/',
    //     filename: '[name].bundle.js',
    //     chunkFilename: '[id].chunk.js'
    // },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.pug', '.less']
    },
    externals: [],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                include: helpers.root('src', 'app'),
                use: [
                    "raw-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: ['raw-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack'
            },
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['app', 'vendor', 'polyfills']
        // }),
        // AOT Plugin 
        // new AotPlugin({
        //     tsConfigPath: './tsconfig.aot.json',
        //     entryModule: helpers.root('app/app.module#AppModule')
        // }),
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.webpack.json',
            entryModule: './src/app/app.module#AppModule',
            sourceMap: true,
            locale: 'en',
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        //  new MiniCssExtractPlugin('[name].css')
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false,
        //     comments: false,
        //     compress: {
        //         screw_ie8: true,
        //         warnings: false
        //     },
        //     mangle: {
        //         keep_fnames: true,
        //         screw_i8: true
        //     }
        // }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'ENV': JSON.stringify(ENV)
        //     }
        // })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        port: 4202,
        hot: true
    }
};