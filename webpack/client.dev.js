const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../client'),
  devtool: 'inline-source-map',
  resolve: { extensions: ['.js', '.jsx'] },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/only-dev-server',
    './src/client.js'
  ],
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: './js/index.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [{
        test: /^(?!.*\.(test||index)\.).*\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../server/views/index.dev.ejs'),
      inject: false,
    }),
    new CopyWebpackPlugin([ { from: path.join(__dirname,'../server/public/assets'), to: 'assets' } ])
  ],
};
