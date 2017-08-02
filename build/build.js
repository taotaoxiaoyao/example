require('./check-versions')();
require('shelljs/global');
var ora = require('ora'),
  path = require('path'),
  webpack = require('webpack'),
  config = require('../config'),
  webpackConfig = require('./webpack.prod.conf'),
  spinner = ora('building for production...'),
  assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

env.NODE_ENV = 'production';

spinner.start()
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/*', assetsPath);


webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')

  console.log(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n')
})
