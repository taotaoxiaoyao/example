var utils = require('./utils'),
  webpack = require('webpack'),
  config = require('../config'),
  merge = require('webpack-merge'),
  baseWebpackConfig = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  env = config.build.env,
  // path = require('path'),
  // CopyWebpackPlugin = require('copy-webpack-plugin'),
  // OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),

  getHtmlConfigs = require('./getHtmlConfigs'),
  htmlConfigs= getHtmlConfigs('./src/module/**/index.js', './src/module/'),
  webpackConfig = merge(baseWebpackConfig, {
    module: {
      loaders: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': env
      }),
      //此处使用DllReferencePlugin结合webpack.dll.conf.js生成的js和json使用，作用：打包第三方库
      // new webpack.DllReferencePlugin({
      //   context: __dirname,
      //   manifest: require('./manifest.json')
      // }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
      }),

      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      //manifest用于解决缓存问题
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      })
    ]
  });

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}


module.exports = webpackConfig;

htmlConfigs.forEach(function(config){
  module.exports.plugins.push(new HtmlWebpackPlugin(config));
})
