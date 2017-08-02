//获取css相关配置
var path = require('path'),
  config = require('../config'),
  //抽取css的插件
  ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {};
  //获取样式、预处理器等的loader项
  function generateLoaders(loaders) {
    let sourceLoader = loaders.map(function(loader) {
      let extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    }).join('!');

    // 抽取出css
    if (options.extract) {
      return ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: sourceLoader
      });
    } else {
      return ['vue-style-loader', sourceLoader].join('!');
    }
  }

  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  };
};

//配置loaders处的值
exports.styleLoaders = function(options) {
  let output = [];
  let loaders = exports.cssLoaders(options);
  for (let extension in loaders) {
    let loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    });
  }
  return output;
};
