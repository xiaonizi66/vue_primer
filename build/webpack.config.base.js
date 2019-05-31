const path = require('path')
const isDev = process.env.NODE_ENV === 'development';
const config = {
    target: 'web',
    entry: path.join(__dirname, '../src/index.js'),
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
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
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
                            name: 'resources/[path][name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}


module.exports = config