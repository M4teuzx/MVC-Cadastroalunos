const mysql = require('mysql2/promise');

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'sql10.freemysqlhosting.net',
      user: 'sql10644106',
      password: '2MaCXdsfyS',
      database: 'sql10644106'
    });
    return connection;
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
}
async function query(sql) {
  const connection = await connect();
  try {
    const [rows, fields] = await connection.execute(sql);
    return rows;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  } finally {
    if (connection) {
        connection.end();
    }
  }
}


module.exports = {query};