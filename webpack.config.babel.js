import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'kafkaesque-ui'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', include },
      { test: /\.json$/, loader: 'json', include }
    ]
  }
};
