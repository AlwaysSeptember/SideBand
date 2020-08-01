const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');


// const WebpackModules = require('webpack-modules');

// const optionDefinitions = [
//     { name: 'verbose', alias: 'v', type: Boolean },
//     { name: 'src', type: String, multiple: true, defaultOption: true },
//     { name: 'timeout', alias: 't', type: Number },
//     { name: 'mode', type: String, defaultOption: 'unknown' },
//     { name: 'analyze', type: Boolean, defaultOption: false },
//     { name: 'watch', type: Boolean},
// ];


// const commandLineArgs = require('command-line-args');
// const options = commandLineArgs(
//   optionDefinitions,
//   {partial: false}
// );

const SRC = path.resolve(__dirname, 'tsx');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            './tsx/bootstrap.tsx',
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(mp3)$/i,

                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192,
                            name: '[path][name].[ext]',
                            emitFile: false,
                        },
                    }],
            },
            //
            //     // mimetype audio/mpeg
            //     // publicPath: 'assets',
            //     // options: {
            //

            //     // },
            // },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
            }
        }
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].bundle.js'
    },
    performance: {
        hints: false,
        // hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    plugins: [
        new CompressionPlugin(),
        // new WebpackModules(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        "alias": {
            "react": "preact/compat",
            "react-dom": "preact/compat",


            // "react": "preact-compat",
            // "react-dom": "preact-compat",
            // "react-dom/test-utils": "preact/test-utils"//,

        }
    },
};