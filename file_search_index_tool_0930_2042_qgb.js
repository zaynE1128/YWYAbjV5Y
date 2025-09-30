// 代码生成时间: 2025-09-30 20:42:19
const fs = require('fs');
const path = require('path');

/**
 * 递归地搜索目录中的文件并构建索引
 * @param {string} rootPath - 搜索的根目录
 * @param {Function} callback - 回调函数，接收索引结果
 */
function searchFiles(rootPath, callback) {
  fs.readdir(rootPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      callback(err, null);
      return;
    }

    const index = {};
    files.forEach(file => {
      const filePath = path.join(rootPath, file.name);
      if (file.isDirectory()) {
        // 如果是目录，递归搜索
        index[file.name] = searchFiles(filePath, (error, subIndex) => {
          if (error) {
            callback(error, null);
            return;
          }
          index[file.name] = subIndex;
        });
      } else if (file.isFile()) {
        // 如果是文件，添加到索引
        index[file.name] = filePath;
      }
    });

    callback(null, index);
  });
}

/**
 * 主函数，用于启动文件搜索和索引工具
 * @param {string} rootPath - 要搜索的根目录
 */
function main(rootPath) {
  searchFiles(rootPath, (err, index) => {
    if (err) {
      console.error('Error searching files:', err.message);
      return;
    }
    console.log('File index:', JSON.stringify(index, null, 2));
  });
}

// 假设我们要从这个路径开始搜索
const rootDirectory = process.argv[2];
if (!rootDirectory) {
  console.error('Please provide a root directory path as an argument.');
  process.exit(1);
}

main(rootDirectory);