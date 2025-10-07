// 代码生成时间: 2025-10-08 03:09:21
const EventEmitter = require('events');

// Define a TaskAssignment class that extends EventEmitter
class TaskAssignment extends EventEmitter {
   constructor() {
       super();
       this.tasks = []; // Stores the tasks
   }

   // Adds a new task to the system
   addTask(task) {
       if (!task || typeof task !== 'object') {
           throw new Error('Invalid task details provided.');
       }
       this.tasks.push(task);
       this.emit('taskAdded', task);
   }

   // Retrieves all tasks in the system
   getTasks() {
       return this.tasks;
   }

   // Assigns a task to a user
   assignTask(taskId, userId) {
       const task = this.tasks.find(t => t.id === taskId);
       if (!task) {
           throw new Error('Task not found.');
       }
       task.assignedTo = userId;
       this.emit('taskAssigned', task);
   }

   // Marks a task as completed
   completeTask(taskId) {
       const task = this.tasks.find(t => t.id === taskId);
       if (!task) {
           throw new Error('Task not found.');
       }
       task.completed = true;
       this.emit('taskCompleted', task);
   }
}

// Create an instance of TaskAssignment
const taskSystem = new TaskAssignment();

// Emit events when tasks are added, assigned, or completed
taskSystem.on('taskAdded', (task) => {
   console.log(`Task added: ${JSON.stringify(task)}`);
});
taskSystem.on('taskAssigned', (task) => {
   console.log(`Task assigned to ${task.assignedTo}: ${JSON.stringify(task)}`);
});
taskSystem.on('taskCompleted', (task) => {
   console.log(`Task completed: ${JSON.stringify(task)}`);
});

// Example usage
try {
   taskSystem.addTask({ id: 1, name: 'Task 1' });
   taskSystem.assignTask(1, 'User A');
   taskSystem.completeTask(1);
} catch (error) {
   console.error(error.message);
}
