const Koa = require('koa');

const staticCache = require('koa-static-cache'); // 静态资源
const compress = require('koa-compress'); // 压缩数据来提高传输速度
const session = require('koa-session'); // 信息持久化存储，记录当前用户登入账号
const path = require('path');
const portfinder = require('portfinder');
const chalk = require('chalk');

let basePort = 8080;
const app = new Koa();

app.use(staticCache(__dirname)); // 当前目录作为静态资源目录
app.use(staticCache(path.join(__dirname, './static'))); // 当前目录作为静态资源目录
app.use(staticCache(path.join(__dirname, './static'), {
  prefix: '/dist' // 指定目录添加路由前缀
}));

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

const CONFIG = {
    key: 'koa:sess',
    /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 0,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));

// 开启端口监听
portfinder.basePort = basePort;
portfinder.getPort((err, port) => {
  if (err) {
    console(err);
  } else {
    app.listen(port);
    console.log(`[${new Date().toLocaleString()}]`);
    console.log(chalk.green('INFO'), ' connect to', chalk.underline(`http://127.0.0.1:${port}`));
  }
});
