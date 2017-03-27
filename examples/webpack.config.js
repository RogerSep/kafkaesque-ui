const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const devServer = require( "./webpack.devserver.js" )
const ExtractTextPlugin = require( "extract-text-webpack-plugin" )

module.exports = {
  entry: {
    "tab-syncing": path.resolve( __dirname, "./src/tab-syncing/index.tsx" ),
    offline: path.resolve( __dirname, "./src/offline/index.tsx" )
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
            { loader: "style-loader", options: { sourceMap: true } }
          ],
          use: [
            { loader: "css-loader", options: { sourceMap: true } }
          ]
        } )
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract( {
          fallback: [
            { loader: "style-loader" }
          ],
          use: [
            { loader: "css-loader", options: { sourceMap: true, modules: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ]  
        } )
      },
      {
        test: /\.md$/,
        use: [
          { loader: "html-loader" },
          { loader: "markdown-loader" }
        ]
      }
    ]
  },

  resolve: {
    extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ],
    alias: {
      "kafkaesque-ui$": path.resolve( __dirname, "../dist/kui.js" )
    }
  },

  plugins: [
    new HtmlWebpackPlugin( {
      filename: "tab-syncing.html",
      chunks: [ "tab-syncing" ]
    } ),
    new HtmlWebpackPlugin( {
      filename: "offline.html",
      chunks: [ "offline" ]
    } ),
    new ExtractTextPlugin( {
      filename: "[name].css"
    } )
  ]
};