// 代码生成时间: 2025-09-16 14:43:02
const { CronJob } = require('cron');

// Task scheduler class
class TaskScheduler {
  
  constructor() {
    this.jobs = [];
  }

  /**
# NOTE: 重要实现细节
   * Add a task to the scheduler
   *
# 扩展功能模块
   * @param {string} schedule - The schedule for the task in cron format
   * @param {function} task - The task to be executed
   */
# 改进用户体验
  addTask(schedule, task) {
# FIXME: 处理边界情况
    try {
      const job = new CronJob({
        cronTime: schedule,
        onTick: task,
# 改进用户体验
        start: true,
# 优化算法效率
        timeZone: 'UTC'
      });
      this.jobs.push(job);
      console.log(`Task added at ${schedule}`);
    } catch (error) {
# 扩展功能模块
      console.error(`Error adding task: ${error.message}`);
    }
  }

  /**
   * Remove a task from the scheduler by its schedule
   *
# 增强安全性
   * @param {string} schedule - The schedule of the task to be removed
   */
  removeTask(schedule) {
    try {
      const job = this.jobs.find(job => job.cronTime === schedule);
      if (job) {
        job.stop();
        this.jobs = this.jobs.filter(currentJob => currentJob !== job);
        console.log(`Task removed at ${schedule}`);
      } else {
        console.warn(`No task found at ${schedule}`);
      }
    } catch (error) {
      console.error(`Error removing task: ${error.message}`);
    }
  }
}

// Example usage
const scheduler = new TaskScheduler();

// Define a task
const myTask = () => {
  console.log('Task executed at:', new Date());
};
# FIXME: 处理边界情况

// Add a task to run every 10 minutes
scheduler.addTask('*/10 * * * *', myTask);

// Remove the task after 5 minutes (for demonstration purposes)
setTimeout(() => {
  scheduler.removeTask('*/10 * * * *');
}, 300000);