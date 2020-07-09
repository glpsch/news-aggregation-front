

module.exports = {
    entry: { main: './src/js/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].[hash].js'
        filename: '[name].js'
    },
    devServer: {
        hot: true,
        before(app, server) {
            server._watch(`./src/index.html`);
        }
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // {
            //     test: /\.css$/i,
            //     use: [
            //         (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            //         'css-loader',
            //         'postcss-loader'
            //     ]
            // },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(png|jp?g|gif|ico|svg)$/i,
                use: [
                    'file-loader?name=./images/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },
            {
              test: /\.html$/,
              use: [
              {
              //     // Передаем результат в bemdecl-to-fs-loader
                  loader: 'bemdecl-to-fs-loader',
              //     // Указываем уровни переопределения и расширения технологий
                  // options: { levels: ['blocks'], extensions: ['css', 'js'] }
                  options: { levels: ['blocks'], extensions: ['css'] }
              },
              // Для начала передаем файл в html2bemdecl-loader
              { loader: 'html2bemdecl-loader' }
              ] }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: 'style.[contenthash].css'
            filename: 'style.css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        // new HtmlWebpackPlugin({
            // inject: false,
            // template: './src/index.html',
            // filename: 'index.html'
        // }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new сopy({patterns:
          [
            // { from: path.resolve(__dirname, '..', 'news-aggregation-front', 'src', 'index.html'), to: path.resolve(__dirname, "dist") }
            { from: path.resolve(__dirname, 'src', 'index.html'), to: path.resolve(__dirname, "dist") }
          ]
        }
      )
    ]
    ,
    optimization: {
        minimizer: [
            new TerserPlugin({
                // sourceMap: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    }
                },
            }),
        ],
    }
};