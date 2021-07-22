var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
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
        compress: true
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
            chunkFilename: './src/index.css'
        })
    ]
}