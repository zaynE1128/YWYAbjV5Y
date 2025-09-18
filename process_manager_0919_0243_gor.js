// 代码生成时间: 2025-09-19 02:43:00
 * Features:
 *   - Listing all processes
 *   - Killing a process by PID
 *   - Monitoring process status
 */

// Import required Node.js modules
const { exec } = require('child_process');
const util = require('util');

// Promisify the exec function for easier use with async/await
const execAsync = util.promisify(exec);

// Function to list all system processes
async function listProcesses() {
  try {
    // Execute the 'ps' command to list all processes
    const { stdout } = await execAsync('ps aux');
    console.log('System Processes:');
    console.log(stdout);
  } catch (error) {
    console.error('Error listing processes:', error);
  }
}

// Function to kill a process by its PID
async function killProcess(pid) {
  try {
    // Execute the 'kill' command to terminate the process
    await execAsync(`kill ${pid}`);
    console.log(`Process with PID ${pid} has been killed.`);
  } catch (error) {
    console.error(`Error killing process with PID ${pid}:`, error);
  }
}

// Function to monitor a process by its PID
async function monitorProcess(pid) {
  try {
    // Execute the 'ps' command to check if the process is still running
    const { stdout } = await execAsync(`ps -p ${pid} | grep ${pid}`);
    if (stdout) {
      console.log(`Process with PID ${pid} is still running.`);
    } else {
      console.log(`Process with PID ${pid} is not running.`);
    }
  } catch (error) {
    console.error(`Error monitoring process with PID ${pid}:`, error);
  }
}

// Main function to handle user input and execute the desired action
async function main() {
  const action = process.argv[2];
  const pid = parseInt(process.argv[3], 10);

  switch (action) {
    case 'list':
      await listProcesses();
      break;
    case 'kill':
      if (isNaN(pid)) {
        console.error('Please provide a valid PID.');
      } else {
        await killProcess(pid);
      }
      break;
    case 'monitor':
      if (isNaN(pid)) {
        console.error('Please provide a valid PID.');
      } else {
        await monitorProcess(pid);
      }
      break;
    default:
      console.error('Invalid action. Please use 