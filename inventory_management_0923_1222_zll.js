// 代码生成时间: 2025-09-23 12:22:24
const fs = require('fs');
const path = require('path');

// 定义库存管理系统类
class InventoryManagement {
  // 构造函数，初始化库存文件路径
  constructor(filePath) {
    this.filePath = filePath;
  }

  // 读取库存文件
  readInventory() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('读取库存文件失败:', error);
      throw error;
    }
  }

  // 写入库存文件
  writeInventory(inventory) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(inventory, null, 2), 'utf8');
    } catch (error) {
      console.error('写入库存文件失败:', error);
      throw error;
    }
  }

  // 添加库存项
  addItem(item) {
    const inventory = this.readInventory();
    inventory[item.id] = item;
    this.writeInventory(inventory);
  }

  // 删除库存项
  removeItem(itemId) {
    const inventory = this.readInventory();
    delete inventory[itemId];
    this.writeInventory(inventory);
  }

  // 更新库存项
  updateItem(itemId, newItem) {
    const inventory = this.readInventory();
    if (inventory[itemId]) {
      inventory[itemId] = newItem;
      this.writeInventory(inventory);
    } else {
      console.error('库存项不存在:', itemId);
      throw new Error('库存项不存在');
    }
  }

  // 获取特定库存项
  getItem(itemId) {
    const inventory = this.readInventory();
    if (inventory[itemId]) {
      return inventory[itemId];
    } else {
      console.error('库存项不存在:', itemId);
      throw new Error('库存项不存在');
    }
  }

  // 获取全部库存
  getAllItems() {
    return this.readInventory();
  }
}

// 定义库存文件路径
const inventoryFilePath = path.join(__dirname, 'inventory.json');

// 创建库存管理系统实例
const inventoryManager = new InventoryManagement(inventoryFilePath);

// 示例用法
try {
  inventoryManager.addItem({ id: '001', name: '产品A', quantity: 100 });
  inventoryManager.addItem({ id: '002', name: '产品B', quantity: 200 });
  console.log('获取全部库存:', inventoryManager.getAllItems());
  inventoryManager.updateItem('001', { name: '产品A', quantity: 150 });
  console.log('更新后的全部库存:', inventoryManager.getAllItems());
  inventoryManager.removeItem('002');
  console.log('删除后的全部库存:', inventoryManager.getAllItems());
} catch (error) {
  console.error('操作失败:', error.message);
}
