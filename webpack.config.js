const HtmlPlugin = require('html-webpack-plugin');
const HtmlHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',

  entry: './client/app/main.js',

  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: './client/index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlHarddiskPlugin(),
    new MiniCssExtractPlugin()
  ],

  // Development config
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
};
