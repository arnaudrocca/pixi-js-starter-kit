const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const config = {
    entry: [
        './src/scripts/index.js',
        './src/styles/main.styl'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        inline: true,
        contentBase: './static',
        outputPath: path.join(__dirname, 'build')
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: '',
        alias: {
            TweenMax: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/templates/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin(
            [{
                from: 'static'
            }],
            {
                ignore: ['.DS_Store']
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true }),
        new CleanWebpackPlugin(['build'], { root: __dirname })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ],
        postLoaders: [
           {
               test: /\.js$/,
               loader: 'transform/cacheable?brfs',
               include: path.resolve(__dirname, 'node_modules/pixi.js')
           }
       ]
    },
    postcss: () => {
        return [
            precss,
            autoprefixer({
                add: true,
                remove: true
            })
        ];
    }
};

module.exports = config;
