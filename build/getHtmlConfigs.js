/**
 * Created by Administrator on 2017/4/11.
 */
let getPath = require('./getPath');
let fs = require('fs');
let configs = [];

module.exports = function (pages, baseUrl) {
  let result = getPath(pages);
  for(let pathname in result) {
    let config = null;             //每个页面的配置信息
    let metaConfigs = baseUrl + pathname + '.json';      //自定义信息的配置，如title、favicon等
    if(pathname.indexOf('index') > -1) {
      config = {
        filename: pathname + '.html',
        template: 'index.html',
        inject: true,
        //仅在文件修改后才会发布文件，默认值
        cache: true,
        minify: {
          collapseWhitespace: false,
          removeComments: true,
          removeAttributeQuotes: true
        },
        chunks: ['manifest', 'vendor', pathname],
        showErrors: true,
        excludeChunks: [],
        chunksSortMode: 'auto',
        favicon: '',
        //此属性是额外添加用于配置诸如不同title，不同favicon等信息的
        metas: {
          title: 'default',
          favicon: ''
        }
      };
      let metas = JSON.parse(fs.readFileSync(metaConfigs, 'utf8'));
      Object.assign(config.metas, metas);
      configs.push(config);
      //以下异步操作得不到想要的结果
      //由于node目前推荐readFile文件之前不检测文件是否存在，而是直接readFile，然后出错时直接抛出异常
      // fs.readFile(metaConfigs, {
      //   encoding: 'utf8'
      // }, (err, data) => {
      //   if (err) throw err;
      //   config.metas = Object.assign({}, config.metas, JSON.parse(data));
      // });
      // if(config){
      //   configs.push(config);
      // }
    }
  }
  return configs;
}
