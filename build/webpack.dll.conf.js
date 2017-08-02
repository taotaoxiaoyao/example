/**
 * Created by Administrator on 2016/12/16.
 */
var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: {
    lib: ['vue', 'vue-router', 'axios', 'vuex', 'element-ui']
  },
  output: {
    path: path.resolve(__dirname, '../static/js/'),
    filename: '[name].[chunkhash:7].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.lib_hash值`
     */
    library: '[name]_[chunkhash:7]'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: './build/manifest.json',
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_[chunkhash:7]'
    })
  ]
};
