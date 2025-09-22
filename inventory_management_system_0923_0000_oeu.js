// 代码生成时间: 2025-09-23 00:00:24
const EventEmitter = require('events');

// 定义Inventory类
class Inventory extends EventEmitter {
  // 构造函数，初始化库存列表
  constructor() {
    super();
    this.items = [];
  }

  // 添加库存项
  addItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item format');
    }
    this.items.push(item);
    this.emit('itemAdded', item);
  }

  // 删除库存项
  removeItem(itemId) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Item not found');
    }
    const removedItem = this.items.splice(index, 1)[0];
    this.emit('itemRemoved', removedItem);
  }

  // 更新库存项
  updateItem(itemId, newItem) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = newItem;
    this.emit('itemUpdated', newItem);
  }

  // 获取所有库存项
  getItems() {
    return this.items;
  }

  // 根据ID获取库存项
  getItem(itemId) {
    const item = this.items.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
}

// 创建库存管理实例
const inventory = new Inventory();

// 监听库存项添加事件
inventory.on('itemAdded', item => console.log(`Item added: ${JSON.stringify(item)}`));

// 监听库存项删除事件
inventory.on('itemRemoved', item => console.log(`Item removed: ${JSON.stringify(item)}`));

// 监听库存项更新事件
inventory.on('itemUpdated', item => console.log(`Item updated: ${JSON.stringify(item)}`));

// 添加一些库存项
inventory.addItem({ id: 1, name: 'Product A', quantity: 10 });
inventory.addItem({ id: 2, name: 'Product B', quantity: 20 });

// 获取所有库存项
console.log('Current inventory:', inventory.getItems());

// 更新库存项
inventory.updateItem(1, { id: 1, name: 'Product A', quantity: 15 });

// 删除库存项
inventory.removeItem(2);

// 获取所有库存项
console.log('Current inventory:', inventory.getItems());