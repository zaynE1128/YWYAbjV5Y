// 代码生成时间: 2025-10-06 02:54:24
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const marked = require('marked'); // 使用marked解析Markdown

// 创建Express应用
const app = express();

// 设置静态文件目录
app.use(express.static('public'));

// 使用body-parser解析POST请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 服务端保存富文本数据的文件路径
const textFilePath = path.join(__dirname, 'richText.txt');

// GET请求处理，返回富文本编辑器的初始页面
app.get('/', (req, res) => {
    fs.readFile(textFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        // 使用marked渲染Markdown文本
        const html = marked.parse(data);
        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Rich Text Editor</title>
                </head>
                <body>
                    <div id="editor">
                        ${html}
                    </div>
                    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
                    <script>
                        new SimpleMDE({ element: document.getElementById("editor") });
                    </script>
                </body>
            </html>
        `);
    });
});

// POST请求处理，保存用户编辑的富文本
app.post('/save', (req, res) => {
    // 从请求体中获取富文本数据
    const content = req.body.content;
    if (!content) {
        res.status(400).send('Content is required');
        return;
    }
    // 将富文本数据写入文件
    fs.writeFile(textFilePath, content, 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error writing file');
            return;
        }
        res.send('Content saved successfully');
    });
});

// 监听3000端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

// 注意：
// 1. 本示例使用SimpleMDE作为富文本编辑器。
// 2. 富文本数据被保存在一个名为'richText.txt'的文件中。
// 3. 使用'express.static'服务静态文件，例如CSS和JavaScript文件。
// 4. 使用'body-parser'处理POST请求体。
// 5. 使用'marked'解析Markdown文本。