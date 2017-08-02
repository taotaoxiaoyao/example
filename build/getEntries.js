/**
 * Created by zhangnan on 17/4/17.
 */
const getPath = require('./getPath');
let entries = getPath('./src/module/**/index.js');
entries.vendor = ['vue', 'vue-router', 'axios', 'vuex'];
module.exports = entries;
