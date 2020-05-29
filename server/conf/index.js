const path = require('path');
const fs = require('fs');

const importConfig = (filePath, name) => {
  const url = path.join(filePath, name);
  try {
    fs.accessSync(url, fs.constants.R_OK);
    return require(url);
  } catch (err) {
    return {};
  }
};

const {
  serverPort = 3001,
  dbHost = '127.0.0.1',
  dbPort = 3306, 
  databaseName = 'koa_demo',
  dbName = 'root',
  dbPassword = '123456',
} = importConfig(__dirname, './overWrite.js');

module.exports = {
  port: serverPort,
  api: '/api/v1',
  db: {
    host: dbHost,
    port: dbPort,
    database: databaseName,
    username: dbName,
    password: dbPassword
  }
};
