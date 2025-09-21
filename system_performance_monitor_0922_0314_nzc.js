// 代码生成时间: 2025-09-22 03:14:26
const os = require('os');
const { performance } = require('perf_hooks');

/**
 * 获取CPU负载信息
 * @returns {Promise<Object>} CPU负载信息对象
 */
function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const cpuLoad = os.loadavg();
    resolve({
      '1m': cpuLoad[0],
      '5m': cpuLoad[1],
      '15m': cpuLoad[2],
    });
  });
}

/**
 * 获取内存使用信息
 * @returns {Promise<Object>} 内存使用信息对象
 */
function getMemoryUsage() {
  return new Promise((resolve, reject) => {
    const memory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = memory - freeMemory;
    const usage = usedMemory / memory;
    resolve({
      total: memory,
      free: freeMemory,
      used: usedMemory,
      usage: usage.toFixed(2),
    });
  });
}

/**
 * 获取磁盘空间信息
 * @returns {Promise<Object>} 磁盘空间信息对象
 */
function getDiskSpace() {
  return new Promise((resolve, reject) => {
    os.diskSpace('/').then(space => {
      resolve({
        total: space.total,
        used: space.used,
        free: space.free,
      });
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * 监控系统性能
 * @returns {Promise<Object>} 系统性能监控结果对象
 */
function monitorSystemPerformance() {
  return Promise.all([getCpuLoad(), getMemoryUsage(), getDiskSpace()])
    .then(results => {
      const [cpuLoad, memoryUsage, diskSpace] = results;
      return {
        cpuLoad: cpuLoad,
        memoryUsage: memoryUsage,
        diskSpace: diskSpace,
      };
    }).catch(error => {
      console.error('Error monitoring system performance:', error);
      throw error;
    });
}

// 示例：监控系统性能
monitorSystemPerformance().then(result => {
  console.log('System Performance:', result);
}).catch(error => {
  console.error('Error:', error);
});