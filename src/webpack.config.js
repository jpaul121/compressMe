var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ]
    },
    module: {
        rules: [
            { 
                test: /\.(js|ts|tsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            { 
                test: /\.css$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 8000
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
            chunkFilename: 'index.css'
        })
    ]
}