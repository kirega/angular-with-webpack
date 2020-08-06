var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


var helpers = require('./config/helpers.js');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.pug', '.less']
    },

    module: {
        rules: [

            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/],
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.webpack.json')
                        }
                    },
                    {
                        loader:'angular2-template-loader',
                    },
                    'angular-router-loader'
                    
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.css$/,
            //     loader: MiniCssExtractPlugin.loader
            // },
            {
                test: /\.scss$/i,
                use: [
                    // 'style-loader',
                    // "raw-loader",
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                            sourceMap: true
                        }
                    }
                ],
                include: helpers.root('src', 'app')
            },

            {
                test: /\.scss$/i,
                use: [
                    // 'style-loader',
                    // "raw-loader",
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                            sourceMap: true
                        }
                    }
                ],
                include: helpers.root('src', 'assets')
            },

        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
    ],
    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            chunks: 'all',
        },
    },
};