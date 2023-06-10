/* eslint-disable */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const PATHS = {
    index: path.resolve('src', 'index.ts'),
    dist: path.resolve('dist'),
};

module.exports = {
    mode: 'development',

    entry: {
        path: PATHS.index,
    },
    output: {
        path: PATHS.dist,
    },

    devServer: {
        port: 8080,
        liveReload: true,
        hot: false,
        host: '0.0.0.0',
        static: { publicPath: '/' },
        devMiddleware: {
            stats: { all: false, errors: true, colors: true, timings: true, performance: true },
        },
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('index.html'),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                type: 'asset/source',
            },
        ],
    },
};
