const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
      }
    }
  },
  devServer: {
    proxy: {  // 代理配置
      '/api': {
        target: 'http://127.0.0.1:8000', // 后台地址
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/api': '/'
        }
      },
    }
  },
}