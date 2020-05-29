const compose = require('koa-compose'), // 将多个函数合并为一个函数（ g() + h() => g(h()) ）
    glob = require('glob'),
    { resolve } = require('path');

function registerRouter(){
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))  // 同步读取当前目录下的js文件
        .filter(value => (value.indexOf('index.js') === -1))
        .map(router => {
            routers.push(require(router).routes()) // 将各个文件封装成一个dispatch函数
            routers.push(require(router).allowedMethods()) // 将各个文件封装成一个allowedMethods函数
        })
    return compose(routers) // 将多个函数合并为一个函数
}

module.exports = registerRouter;