const glob = require('glob'),
    { resolve } = require('path'),
    Sequelize = require('sequelize'),
    { db } = require('../conf'),
    {logger} = require('../utils/logger');

function initOrm(sequelize){
    logger.info('*************** Sequelize defined tables - begin ***************');
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter(value => {
            return value.indexOf('index.js') === -1 && value.indexOf('model.js') === -1;
        }).map(orm => {
            let instance = require(orm);
            instance.define(sequelize);
        });
    logger.info('*************** Sequelize defined tables - end ***************');
}

function initSequelize() {
    logger.info('*************** Sequelize init - begin ***************');
    // starting = true;
    let sequelize = new Sequelize(db.database, db.user, db.password, {
        host: db.host,
        port: db.port,
        dialect: 'mysql',
        pool: db.pool || {
            max: 500,
            min: 0,
            idle: 10000
        },
        timezone:db.timezone || '+8:00',
        logging: (db.showSql ? console.log : false)
    });
    logger.info('*************** Sequelize init - end ***************');
    return sequelize;
};

exports.readyDB = function(){
    initOrm(initSequelize());
};

