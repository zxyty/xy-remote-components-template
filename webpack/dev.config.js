const { join } = require('path');
const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

module.exports = {
  mode: 'development',

  entry: common.entry,

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    // open: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    disableHostCheck: true,
    stats: { colors: true },
  },

  output: Object.assign({}, common.output, {
    filename: '[name].js',
  }),

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(
      common.copyPluginConfig.patterns,
      common.copyPluginConfig.options,
    ),
    new webpack.NoEmitOnErrorsPlugin(),
  ].concat(
    common.htmlPluginConfig.map(c => {
      return new HtmlPlugin(
        Object.assign({}, c, {
          template: join(__dirname, '..', 'src', 'index.dev.ejs'),
        }),
      );
    }),
  ),

  module: {
    rules: [
      common.templateLoader,
      common.jsLoader,
      common.lessLoaderSrc,
      common.lessLoaderNodeModules,
      common.fileLoader,
      common.urlLoader,
      common.htmlLoader
    ],
  },

  resolve: {
    ...common.resolve,
  },
};
