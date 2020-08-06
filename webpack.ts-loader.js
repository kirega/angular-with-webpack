const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
        // 'styles': './src/styles.scss'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader']
            //     // loader: MiniCssExtractPlugin.loader
            // },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            }
        ]
    },
    externals: [],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.pug', '.less'],
        modules: ['node_modules', 'src']
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist'),
        chunkFilename: '[name].bundle.js',
    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 4300
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './src}'),
            {} // a map of your routes
        ),
    ]
};