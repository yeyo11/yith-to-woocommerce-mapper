import mariadb from 'mariadb';

export const buildDB = async (config) => {
  
  const pool = mariadb.createPool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    connectionLimit: 5
  });
  
  const mariaDB = await pool.getConnection();

  const findUserById = async (customer_id) => {
    const query = `SELECT * FROM wp_users WHERE ID=${customer_id}`;
    const user = await mariaDB.query(query); 
    return user;
  }

  const close = async () => {
    await mariaDB.end();
  }

  return {
    findUserById,
    close
  }
};