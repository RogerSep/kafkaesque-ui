const path = require('path');
const failPlugin = require('webpack-fail-plugin');

module.exports = {
  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: "umd",
    library: "kafkaesque-ui"

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
    failPlugin
  ]
};