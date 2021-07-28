const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
        publicPath: '',
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ],
    },
    module: {
        rules: [
            { 
                test: /\.(js|ts|tsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            { 
                test: /\.css$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, '../dist'),
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/assets/favicon.ico',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            chunkFilename: './src/index.css',
            filename: 'main.bundle.css',
        }),
    ],
}