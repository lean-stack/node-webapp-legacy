const HtmlPlugin = require('html-webpack-plugin');
const HtmlHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  mode: 'development',

  entry: './client/app/main.js',

  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true
  },

  plugins: [
    new HtmlPlugin({
      template: './client/index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlHarddiskPlugin()
  ],

  // Development config
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
};
