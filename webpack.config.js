const path = require('path');
const failPlugin = require('webpack-fail-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',

  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'bundle.js',
    libraryTarget: "umd",
    library: "Kui",
    umdNamedDefine: true
  },

  devtool: "source-map",

  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/}
    ]
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.WatchIgnorePlugin([
      path.resolve( __dirname, 'examples' ),
      path.resolve( __dirname, 'dist' )
    ]),
    failPlugin
  ]
};