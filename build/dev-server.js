//检查版本的js模块
require('./check-versions')();
//配置文件信息模块
var config = require('../config'),
  //可以使用指定浏览器或应用打开指定的url
  opn = require('opn'),
  //路径操作
  path = require('path'),
  //引入express框架，快速搭建一个node服务
  express = require('express'),
  //引入webpack模块
  webpack = require('webpack'),
  //代理服务器
  proxyMiddleware = require('http-proxy-middleware'),
  webpackConfig,
  DashboardPlugin = require('webpack-dashboard/plugin');
//判断开发环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
webpackConfig = require('./webpack.dev.conf')
// 设置服务器端口号
var port = process.env.PORT || config.dev.port
// 定义http代理
var proxyTable = config.dev.proxyTable
//启动一个express服务
var app = express()
//加载webpack配置
var compiler = webpack(webpackConfig)
compiler.apply(new DashboardPlugin());
//webpack的开发中间件，专门为webpack提供的一个简单的中间件，可以让文件都加载内存中，不去读写硬盘，并且当文件被改动的时候，不会刷新页面就会部署成功
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  //存取前端bundle的地址
  publicPath: webpackConfig.output.publicPath,
  // stats: {
  //   colors: true,
  //   chunks: true
  // },
  // quiet: false
  quiet: false
})
//使webpack-hot-middleware具备热部署中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler)
//当html被改变的时候，让html被强制部署
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 遍历代理的配置信息，并且使用中间件加载进去
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 当访问找不到页面的时候，该中间件指定了一个默认的页面返回
app.use(require('connect-history-api-fallback')())

// 使用中间件
app.use(devMiddleware)

// 热部署
app.use(hotMiddleware)

// 根据配置信息拼接一个目录路径，然后将该路径下的文件交给express的静态目录管理
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
// var uri = 'http://localhost:' + port + '/select/index.html'
var uri = 'http://localhost:' + port

console.log('> Starting dev server...')
//导出的对象
module.exports = app.listen(port, function(err){
  if(err){
    console.log(err);
    return;
  }
  //非测试环境下打开'http://localhost:' + port
  if(process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
})
