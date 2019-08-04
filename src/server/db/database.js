module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'doc_app',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'doc_app_test',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};
