// 代码生成时间: 2025-10-11 03:59:21
// duplicate_file_detector.js

// 引入fs-extra库用于文件系统操作
const fs = require('fs-extra');
const path = require('path');

// 定义一个函数，用于检测重复文件
async function detectDuplicatesInDir(directory) {
  // 检查目录是否存在
  if (!(await fs.pathExists(directory))) {
    throw new Error('指定的目录不存在');
  }

  // 缓存所有文件内容的哈希值
  const fileHashes = new Map();

  try {
    // 遍历目录及其子目录
    for await (const file of fs.walk(directory)) {
      // 跳过目录，只处理文件
      if (!(await fs.stat(file)).isFile()) continue;

      // 计算文件的哈希值
      const content = await fs.readFile(file);
      const hash = crypto.createHash('sha256').update(content).digest('hex');

      // 如果哈希值已存在，说明发现重复文件
      if (fileHashes.has(hash)) {
        console.log(`发现重复文件：${fileHashes.get(hash)} 和 ${file}`);
      } else {
        // 否则将文件哈希值存入缓存
        fileHashes.set(hash, file);
      }
    }
  } catch (error) {
    // 错误处理
    console.error('检测重复文件时发生错误：', error.message);
    throw error;
  }
}

// 添加命令行接口
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// 解析命令行参数
yargs(hideBin(process.argv))
  .command('$0 <directory>', '检测指定目录下的重复文件', {}, async (argv) => {
    await detectDuplicatesInDir(argv.directory);
  })
  .fail((msg, err, yargs) => {
    if (msg) console.log("错误：" + msg);
    if (err) console.log(err.toString());
    yargs.showHelp();
  })
  .help().argv;

// 导入crypto模块用于生成文件哈希值
const crypto = require('crypto');

// 导出detectDuplicatesInDir函数，以便其他模块可以使用
module.exports = { detectDuplicatesInDir };
