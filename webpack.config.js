const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js',
  secondary: './src/articles-page/articles.js' },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
      // filename: '[name].js'
  },
  devServer: {
      hot: true,
      before(app, server) {
          server._watch(`./pages/index.html`);
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
          inject: true,
          template: './pages/index.html',
          filename: 'index.html',
          chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: './pages/articles.html',
        filename: 'articles.html',
        chunks: ['secondary'],
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