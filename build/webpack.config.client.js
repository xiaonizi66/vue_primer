const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLplugin = require("html-webpack-plugin")
const webpack = require("webpack")
const merge = require('webpack-merge');
const  MiniCssExtractPlugin  = require("mini-css-extract-plugin") //来单独打包css-webpack4
const baseConfig = require('./webpack.config.base');
const isDev = process.env.NODE_ENV === 'development';
let config;
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLplugin(),
]
const  devServer = {
    port: 8000,
    host: 'localhost',
    overlay: {
        errors: true
    },
    hot: true,
    open: true

}
if(isDev){
    
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]),
        module: {
            rules: [
                {
                    test:/\.less$/,
                    use:[
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                }
            ]
        }
    })
    console.log(isDev,config)

}else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test:/\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'less-loader'
                    ]
                }
            ]
        },
        plugins:  defaultPlugins.concat([
            new MiniCssExtractPlugin({
                filename: 'styles.[contenthash:8].css',
            }),
        ])
    })
    
}


module.exports = config