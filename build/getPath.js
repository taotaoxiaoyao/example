/**
 * Created by 张楠 on 2017/4/11.
 * 功能描述: 用于处理出入的一批文件名，如入参./src/module/"**"/index.js(实际使用的时候**没有双引号包裹)，处理后的返回结果为{ 'hello/index': './src/module/hello/index.js',index: './src/module/index.js' }
 */
var glob= require('glob'),
    path= require('path');

module.exports = (entries)=> {
  var result = {}, translate = entries;
  //处理地址中的/**为(/*.*)，用于定义匹配规则，使用()是因为需要通过RegExp.$n获取匹配位置处的信息
  translate = translate.replace('/**', '(/*.*)');
  glob.sync(entries).forEach(function(entry, index){
    //basename为文件名
    var basename = path.basename(entry, path.extname(entry)),
        reg = new RegExp(translate,'g'),
        key;
    reg.test(entry);
    //key值为被匹配到的路径
    key = RegExp.$1;
    if(key){
      result[key.replace('/', '') + '/' + basename] = entry;
    }else {
      result['index'] = entry;
    }
  });

  return result;
};
