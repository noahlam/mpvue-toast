var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var glob = require('glob')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var relative = require('relative')

function getEntry(rootSrc) {
  var map = {};
  glob.sync(rootSrc + '/pages/**/main.js')
    .forEach(file => {
      var key = relative(rootSrc, file).replace('.js', '');
      map[key] = file;
    })
  return map;
}

const appEntry = {app: path.join(__dirname,'../example/main.js')}
const pagesEntry = getEntry(path.join(__dirname,'../example'), 'pages/**/main.js')
const entry = Object.assign({}, appEntry, pagesEntry)


module.exports = {
  entry,
  target: require('mpvue-webpack-target'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': path.join(__dirname, '../example')
    },
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [{loader: 'css-loader',}, {loader: 'px2rpx-loader',}],
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        include: [path.join(__dirname,'../example'), path.join(__dirname, '../test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new MpvuePlugin(),
    new CopyWebpackPlugin([{
      from: '**/*.json',
      to: ''
    }], {
      context: 'example/'
    }),
    new ExtractTextPlugin({
      filename: path.posix.join('','[name].wxss')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count > 1
      }
    }),
  ]
}
