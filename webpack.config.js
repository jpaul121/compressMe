// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import nodeExternals from 'webpack-node-externals'
// import path from 'path'
// import process from 'process'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const process = require('process')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'main.bundle.js',
        publicPath: '',
    },
    target: 'web',
    devtool: 'source-map',
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ],
    },
    node: {
        __dirname: false,
    },
    // externals: [
    //     nodeExternals({
    //     importType: 'umd',
    //     modulesFromFile: {
    //         filename: './package.json',
    //         includeInBundle: [
    //             'dependencies',
    //         ],
    //     },
    // }) ],
    externals: {
        // bufferutil: 'bufferutil',
        buffer: 'root Buffer',
        path: 'path',
        'utf-8-validate': 'utf-8-validate',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.node$/,
                use: 'node-loader',
            },
            {
                test: /\.(jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
            { 
                test: /\.css$/,
                include: path.resolve(process.cwd()),
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                            publicPath: '',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader',
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(process.cwd(), './dist'),
        compress: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
            chunkFilename: './src/index.css',
        })
    ],
}