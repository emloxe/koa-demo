const log4js = require('log4js');
const conf = require('../conf');

log4js.configure({
    appenders: {
        stdout: {//控制台输出
            type: 'console'
        },
        // http: {//请求日志
        //     type: 'dateFile',
        //     filename: 'logs/http',
        //     pattern: '-yyyy-MM-dd.log',
        //     alwaysIncludePattern: true
        // },
        serva: {//错误日志
            type: 'dateFile',
            filename: 'logs/log',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        // oth: {//其他日志
        //     type: 'dateFile',
        //     filename: 'logs/oth',
        //     pattern: '-yyyy-MM-dd.log',
        //     alwaysIncludePattern: true
        // }
    },
    categories: { //appenders:采用的appender,取appenders项,level:设置级别
        default: {
            appenders: ['stdout', 'serva'],
            level: conf.logLevel || 'error'
        },
        // http: {
        //     appenders: ['stdout', 'http'],
        //     level: conf.logLevel || 'error'
        // },
        // oth: {
        //     appenders: ['stdout', 'oth'],
        //     level: 'info'
        // }
    }
});

let logger = log4js.getLogger('default');
exports.logger = logger;
exports.log4js = log4js;

//name取categories项
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
}

exports.connectionApp = function (app) {
    app.use(log4js.connectLogger(this.getLogger("http"), {level: log4js.levels.DEBUG}));
};
