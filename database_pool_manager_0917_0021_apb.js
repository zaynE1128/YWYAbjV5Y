// 代码生成时间: 2025-09-17 00:21:30
const { Pool } = require('pg');

/**
 * DatabasePoolManager class responsible for managing a connection pool to a PostgreSQL database.
 * It includes methods for querying the database and managing the pool's lifecycle.
 */
class DatabasePoolManager {
  constructor(config) {
    // Initialize the connection pool with the provided configuration
    this.pool = new Pool(config);
  }

  /**
   * Query the database with the provided SQL statement and parameters.
   * @param {string} query - The SQL query to execute.
   * @param {Array} params - An array of parameters for the query.
   * @returns {Promise} - A promise that resolves with the query results.
   */
  async query(query, params = []) {
    try {
      // Connect to the pool and execute the query
      const client = await this.pool.connect();
      try {
        const result = await client.query(query, params);
        return result;
      } finally {
        // Release the client back to the pool
        client.release();
      }
    } catch (error) {
      // Handle any errors that occur during the query
      console.error('Database query error:', error.message);
      throw error;
    }
  }

  /**
   * End the connection pool, which will close all idle clients.
   */
  end() {
    this.pool.end();
  }
}

// Example usage:
// const dbConfig = {
//   user: 'dbuser',
//   host: 'localhost',
//   database: 'mydatabase',
//   password: 'dbpassword',
//   port: 5432,
// };

// const dbPoolManager = new DatabasePoolManager(dbConfig);

// dbPoolManager.query('SELECT * FROM my_table')
//   .then(results => console.log(results.rows))
//   .catch(error => console.error(error))
//   .finally(() => dbPoolManager.end());