var path = require("path");
var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server")
var config = require("./webpack.config.js");
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  //热加载
  hot: true,
  //热加载必须的 inline
  inline: true,
  quiet: false,
  compress: false,
  disableHostCheck: true,
  historyApiFallback: true,
  stats: {
    // Config for minimal console.log mess.
    assets: true,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: true
  },
  proxy: {
    '/good/*': {
      "target": "http://localhost:3000",
      "changeOrigin": true,
      "ignorePath": true,
      "changeOrigin": true,
    }
  }
});
server.listen(8090)