// 代码生成时间: 2025-10-12 22:16:01
const fs = require('fs');
const path = require('path');

// 配置文件路径
const configFilePath = path.join(__dirname, 'config.json');

// 读取配置文件
function readConfig() {
    try {
        const data = fs.readFileSync(configFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading config file:', error);
        throw error;
    }
}

// 更新配置文件
function updateConfig(key, value) {
    try {
        const config = readConfig();
        config[key] = value;
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
        return config;
    } catch (error) {
        console.error('Error updating config file:', error);
        throw error;
    }
}

// 删除配置文件中的键
function deleteConfigKey(key) {
    try {
        const config = readConfig();
        delete config[key];
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
        return config;
    } catch (error) {
        console.error('Error deleting config key:', error);
        throw error;
    }
}

// 主函数，用于测试配置文件管理器的功能
function main() {
    try {
        console.log('Reading config:', readConfig());
        updateConfig('newKey', 'newValue');
        console.log('Updated config:', readConfig());
        deleteConfigKey('newKey');
        console.log('Config after deletion:', readConfig());
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// 运行主函数
main();