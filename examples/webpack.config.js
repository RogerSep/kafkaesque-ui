const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const devServer = require( "./webpack.devserver.js" )
const ExtractTextPlugin = require( "extract-text-webpack-plugin" )

module.exports = {
  entry: {
    "tab-syncing": path.resolve( __dirname, "./src/tab-syncing/index.tsx" ),
    multiplexing: path.resolve( __dirname, "./src/multiplexing/index.tsx" ),
    persistency: path.resolve( __dirname, "./src/persistency/index.tsx" )
  },

  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "[name].js"
  },

  devServer: {
    publicPath: "/",
    setup: devServer
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract( {
          fallback: [
            { loader: "style-loader" }
          ],
          use: [ 
            { loader: "css-loader" }
          ]
        } )
      }
    ]
  },

  resolve: {
    extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ],
    alias: {
      "kafkaesque-ui$": path.resolve( __dirname, "../dist/kui.min.js" )
    }
  },

  plugins: [
    new HtmlWebpackPlugin( {
      filename: "tab-syncing.html",
      chunks: [ "tab-syncing" ]
    } ),
    new HtmlWebpackPlugin( {
      filename: "multiplexing.html",
      chunks: [ "multiplexing" ]
    } ),
    new HtmlWebpackPlugin( {
      filename: "persistency.html",
      chunks: [ "persistency" ]
    } ),
    new ExtractTextPlugin( {
      filename: "[name].css"
    } )
  ]
};