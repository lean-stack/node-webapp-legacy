const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './client/app/main.js',

  output: {
    filename: '[name].[contenthash].js',
    clean: true
  },

  plugins: [
    new HtmlPlugin({ template: './client/index.html' })
  ]
};
