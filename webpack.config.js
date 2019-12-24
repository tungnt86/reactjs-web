const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
    name: 'client',
    target: 'web',
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg||woff|woff2|eot|ttf)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader',
                ],
            },
            {
                test: /\.(ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: JSON.stringify(true)
        })
    ]
};

const serverConfig = {
    name: 'server',
    target: 'node',
    entry: './src/server/index.js',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg||woff|woff2|eot|ttf)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader',
                ],
            },
            {
                test: /\.(ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: JSON.stringify(false)
        })
    ]
};

module.exports = [browserConfig, serverConfig];