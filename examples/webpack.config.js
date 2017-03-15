const path = require('path');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: "var",
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

  plugins: []
};