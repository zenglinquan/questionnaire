var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin")
var htmlPathName = "index.html"
var rootPath = "./src";
var distPath = "./build";
module.exports = {
  entry: {
    index: [path.resolve(rootPath, 'index.js')]
  },
  output: {
    path: path.resolve(__dirname, distPath),
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['env','react']
            presets: ['react', 'es2015', 'stage-3'],
            plugins: ["transform-decorators-legacy", 'transform-class-properties','transform-runtime'],

          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader' },
      { test: /\.svg/, loader: 'svg-url-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["index"],
      filename: path.resolve(distPath, htmlPathName),
      template: path.resolve(rootPath, htmlPathName),
      inject: 'body',
      hash: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false
      }
    })
  ]
}