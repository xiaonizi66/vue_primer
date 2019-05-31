const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLplugin = require("html-webpack-plugin")
const webpack = require("webpack")
const  MiniCssExtractPlugin  = require("mini-css-extract-plugin") //来单独打包css-webpack4
const isDev = process.env.NODE_ENV === 'development';
const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename:'bundle.[hash:8].js'
    },//webpack 4省略入口和出口配置
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(jpg|gif|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLplugin(),
    ]
}
if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: 'localhost',
        overlay: {
            errors: true
        },
        hot: true,
        open: true

    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    config.module.rules.push(
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
    )

}else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
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
    )
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash:8].css',
        }),
        // new webpack.optimize.SplitChunksPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.SplitChunksPlugin({
        //     name: 'runtime'
        // })
    )
    
}


module.exports = config