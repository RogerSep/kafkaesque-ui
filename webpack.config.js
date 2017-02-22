module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js",
    libraryTarget: "umd",
    library: "kafkaesque-ui"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.json$/, loader: 'json' }
    ]
  }
};