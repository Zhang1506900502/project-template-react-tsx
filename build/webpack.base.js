const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

/**
 * webpack五个核心概念
 * 1.Entry：入口文件（从哪开始打包，分析构建内部依赖图）
 * 2.Output：输出 打包后的资源bundles输出到哪里去，以及叫什么名字
 * 3.Loader：（类似翻译官）帮webpack处理非js文件 像css img文件（webpack只能处理js文件）
 * 4.Plugins：插件 执行范围更广任务 做Loader做不了的工作 包括打包优化和压缩 重新定义环境中的变量等
 * 5.Mode：模式分为两种（开发模式和生产模式）
 * development开发模式：代码能在本地运行
 * production生产模式：代码优化上线运行的环境
 */
module.exports = {
    // 配置入口文件
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    // 打包文件出口
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 加上[chunkhash:8] 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    ///loader的配置
    module: {
        rules: [{
            include: [path.resolve(__dirname, '../src')], //只对项目src文件的ts,tsx进行loader解析
            test: /.(ts|tsx)$/, // 匹配.ts, tsx文件\
            use: ['thread-loader', {
                loader: 'babel-loader',
                options: {
                    // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                    presets: [
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ]
                }
            }]
        },
            // {
            //     test: /.css$/,
            //     include: [path.resolve(__dirname,'../src')],
            //     use: ['style-loader',
            //         'css-loader',
            //         'postcss-loader']
            // },
            {
                test: /.(scss|sass)$/, //匹配 css 文件
                include: [path.resolve(__dirname, '../src')],
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader']
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },

            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': path.join(__dirname, '../src')
        },
        modules: [path.resolve(__dirname, '../node_modules')] // 查找第三方模块只在本项目的node_modules中查找
    },
    // 插件
    plugins: [
        // ["@babel/plugin-proposal-decorators", { "legacy": true }],
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        })
    ],
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
}
