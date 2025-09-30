// 代码生成时间: 2025-10-01 03:32:24
const { createClient } = require('redis');

/**
 * TimeSeriesDbTool - A simple Node.js tool for interacting with a time series database.
 * @author Your Name
 */
class TimeSeriesDbTool {
  
  // Redis client instance
  client;
  
  /**
   * Constructor for TimeSeriesDbTool, initializes a Redis client.
   * @param {Object} config - Configuration object containing database details.
   */
  constructor(config) {
    this.client = createClient({
      host: config.host,
      port: config.port
    });
    
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });
    
    this.client.connect();
  }
  
  /**
   * Adds a new data point to the database with a timestamp.
   * @param {string} key - The key under which the data is stored.
   * @param {number} value - The value to store.
   * @param {Date} timestamp - The timestamp for the data point.
   * @returns {Promise<void>} - Resolves when the data point is added.
   */
  async addDataPoint(key, value, timestamp) {
    try {
      await this.client.zadd(key, {
        score: timestamp.getTime() / 1000, // Convert timestamp to seconds
        value
      });
    } catch (err) {
      console.error('Error adding data point:', err);
      throw err;
    }
  }
  
  /**
   * Retrieves data points within a specified time range.
   * @param {string} key - The key from which to retrieve the data.
   * @param {Date} start - The start of the time range.
   * @param {Date} end - The end of the time range.
   * @returns {Promise<Array>} - An array of data points within the range.
   */
  async getDataPointsInRange(key, start, end) {
    try {
      const startTime = start.getTime() / 1000; // Convert to seconds
      const endTime = end.getTime() / 1000; // Convert to seconds
      const dataPoints = await this.client.zrangebyscore(key, startTime, endTime);
      return dataPoints;
    } catch (err) {
      console.error('Error retrieving data points:', err);
      throw err;
    }
  }
  
  // Close the Redis client connection when done
  closeConnection() {
    this.client.quit();
  }
}

// Example usage:
/*
const dbTool = new TimeSeriesDbTool({
  host: 'localhost',
  port: 6379
});

dbTool.addDataPoint('sensor:temperature', 23, new Date())
  .then(() => dbTool.getDataPointsInRange('sensor:temperature', new Date('2023-01-01'), new Date()))
  .then(dataPoints => console.log(dataPoints))
  .catch(error => console.error(error))
  .finally(() => dbTool.closeConnection());
*/
