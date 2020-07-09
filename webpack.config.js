const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const TerserPlugin = require('terser-webpack-plugin');
const Copy = require('copy-webpack-plugin');



// NEW BEM CONFIG
//////////////////////////////
//////////////////////////////
module.exports = {
  entry: path.resolve(__dirname, "src", 'js', "index.js"),
  output: {
      // filename: '[name].[hash].js'
        // filename: '[name].js',

        filename: 'index.js',
      path: path.join(__dirname, 'dist')
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
            test: /\.html$/,
            use: [
              {
                loader: 'bemdecl-to-fs-loader',
                options: { levels: ['blocks'], extensions: ['css', 'js'] } // Add css and js files of BEM entities to bundle
              },
              { loader: 'html2bemdecl-loader' } // First, convert HTML to bem DECL format
            ] },
          { test: /\.css$/, loader: 'style-loader!css-loader' },



          //             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader"
//                 }
//             },
            // {
            //     test: /\.css$/i,
            //     use: [
            //         (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            //         'css-loader',
            //         'postcss-loader'
            //     ]
            // },

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
            }
      ]
  },
  plugins: [
  //   new MiniCssExtractPlugin({
  //     // filename: 'style.[contenthash].css'
  //     filename: 'style.css'
  // }),
      new Copy({patterns: [
          { from: path.resolve(__dirname, 'src', 'index.html'), to: path.resolve(__dirname, "dist") }
      ]})
  ]
}




// FIRST BEM CONFIG
////////////////////////////////////////////////////////////

// const webpack = require('webpack');
// const path = require('path');
// const Copy = require('copy-webpack-plugin');

// module.exports = {
//     entry: path.resolve(__dirname, "src", 'js', "index.js"),
//     output: {
//         filename: 'index.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//               test: /\.html$/,
//               use: [
//                 {
//                   loader: 'bemdecl-to-fs-loader',
//                   options: { levels: ['blocks'], extensions: ['css', 'js'] } // Add css and js files of BEM entities to bundle
//                 },
//                 { loader: 'html2bemdecl-loader' } // First, convert HTML to bem DECL format
//               ] },
//             { test: /\.css$/, loader: 'style-loader!css-loader' }
//         ]
//     },
//     plugins: [
//         new Copy({patterns: [
//             { from: path.resolve(__dirname, 'src', 'index.html'), to: path.resolve(__dirname, "dist") }
//         ]})
//     ]
// }

////////////////////////////////////////////////////////////
