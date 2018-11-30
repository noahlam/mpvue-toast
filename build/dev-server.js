var express = require('express')
var webpack = require('webpack')

var webpackConfig = require('./webpack.dev.conf')

var app = express()
var compiler = webpack(webpackConfig)

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

module.exports = new Promise(resolve => {
      var server = app.listen(8800, 'localhost')
      // for 小程序的文件保存机制
      require('webpack-dev-middleware-hard-disk')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
      })
      resolve({
        ready: readyPromise,
        close: () => {
          server.close()
        }
      })
})
