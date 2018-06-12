const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(config, {
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false,
      compress: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
})