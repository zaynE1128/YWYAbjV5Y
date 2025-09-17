// 代码生成时间: 2025-09-18 00:58:52
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 设置JWT密钥
const JWT_SECRET = 'your_jwt_secret';

// 创建一个Express应用
const app = express();

// 将JSON中间件添加到Express应用中
app.use(express.json());

// 用于存储用户数据的模拟数据库
const users = [];

// 用户注册路由
app.post('/register', async (req, res) => {
  try {
    // 从请求中获取用户名和密码
    const { username, password } = req.body;
    
    // 检查用户名是否已存在
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }
    
    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 8);
    
    // 创建新用户
    const user = { username, password: hashedPassword };
    users.push(user);
    
    // 返回成功消息
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// 用户登录路由
app.post('/login', async (req, res) => {
  try {
    // 从请求中获取用户名和密码
    const { username, password } = req.body;
    
    // 查找用户
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }
    
    // 检查密码是否匹配
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password is incorrect.' });
    }
    
    // 创建JWT
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    
    // 返回JWT
    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user.' });
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 代码注释：
// 这个程序实现了基本的用户身份认证功能，包括注册和登录。
// 用户注册时，密码会被哈希处理，存储在模拟数据库中。
// 用户登录时，会验证用户名和密码是否匹配，并发放一个JWT作为认证凭证。
// 使用了bcryptjs库进行密码哈希和验证，jwt库生成JWT。
// 所有的API都返回JSON格式的响应，并且对可能发生的错误进行了处理。
