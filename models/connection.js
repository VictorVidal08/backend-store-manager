const mysql = require('mysql2/promise');
require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

const connection = mysql.createPool({
  host: MYSQL_HOST || 'localhost',
  user: MYSQL_USER || 'root',
  password: MYSQL_PASSWORD || 'password',
  database: MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;