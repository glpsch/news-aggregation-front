module.exports = {
  entry: { main: './src/js/index.js' },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
      // filename: '[name].js'
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
          {
              test: /\.css$/i,
              use: [
                  (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                  'css-loader',
                  'postcss-loader'
              ]
          },
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
      ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css'
          // filename: 'style.css'
      }),
      new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
              preset: ['default'],
          },
          canPrint: true
      }),
      new HtmlWebpackPlugin({
          // inject: false,
          template: './src/index.html',
          filename: 'index.html'
      }),
      new WebpackMd5Hash(),
      new webpack.DefinePlugin({
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.HotModuleReplacementPlugin(),
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