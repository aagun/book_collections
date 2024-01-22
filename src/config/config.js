const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQL_USERNAME_TEST,
    password: process.env.MYSQL_PASSWORD_TEST,
    database: process.env.MYSQL_DATABASE_TEST,
    host: process.env.MYSQL_HOST_TEST,
    port: +process.env.MYSQL_PORT_TEST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    dialect: 'mysql'
  }
};