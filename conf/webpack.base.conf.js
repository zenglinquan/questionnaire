var path = require("path");
module.exports = {
  entry: {
    app: ["./src/redux-demo/app.js"]
  },
  output: {
    path: path.resolve("./dist"),
    filename: "app.js"
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
            plugins: ["transform-decorators-legacy", 'transform-class-properties'],//,'transform-runtime'

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
}