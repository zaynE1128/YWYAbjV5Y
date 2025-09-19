// 代码生成时间: 2025-09-20 06:03:14
const EventEmitter = require('events');

// 消息通知系统
class MessageNotificationSystem extends EventEmitter {
  // 构造函数
  constructor() {
    super();
    this.messageQueue = [];
  }

  // 发送消息
  sendMessage(message) {
    if (typeof message !== 'string') {
      throw new Error('Message must be a string.');
    }

    this.messageQueue.push(message);
    this.emit('messageAdded', message);
  }

  // 获取消息
  getMessages() {
    return this.messageQueue;
  }

  // 监听消息添加事件
  onMessageAdded(callback) {
    this.on('messageAdded', callback);
  }
}

// 使用示例
const notificationSystem = new MessageNotificationSystem();

// 监听消息添加事件
notificationSystem.onMessageAdded((message) => {
  console.log(`Message received: ${message}`);
});

// 发送消息
notificationSystem.sendMessage('Hello, World!');

// 获取并打印所有消息
console.log(notificationSystem.getMessages());