var path = require('path'),
  utils = require('./utils'),
  config = require('../config'),
  webpack = require('webpack'),
  entries = require('./getEntries');

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.less', '.css', '.js', '.vue', '.json'],
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'static': path.resolve(__dirname, '../static'),
      'jquery': 'jquery'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'jQuery': 'jquery',
      '$': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //   test: /\.(vue)$/,
      //   loader: 'eslint-loader',
      //   include: path.join(path.resolve(__dirname, '../'), 'src'),
      //   exclude: /node_modules/
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            'css': 'vue-style-loader!css-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [/node_modules(\\|\/)element-ui/, /src/,
          /node_modules(\\|\/)aegis-api-helper/],
        exclude: [/utils(\\|\/)popper\.js/]
      },
      {
        test: /\.(png|jpg|gif|svg|ico|icon)$/,
        loader: 'url-loader',
        options: {
          name: 'img/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
