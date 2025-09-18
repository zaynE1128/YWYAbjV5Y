// 代码生成时间: 2025-09-18 13:23:25
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the home page
app.get('/', (req, res) => {
  // Send the index.html file as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// This is a simple HTML file for demonstration purposes
// It uses CSS media queries to create a responsive layout
const indexHtml = `<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Layout</title>
  <link rel="stylesheet" href="styles.css">\</head>
<body>
  <header>
    <h1>Responsive Layout Demo</h1>
  </header>
  <main>
    <section>
      <h2>Section标题</h2>
      <p>这里是一些文本。</p>
    </section>
  </main>
  <footer>
    <p>Footer内容</p>
  </footer>
</body>
</html>`;

// This is a simple CSS file for demonstration purposes
// It uses media queries to create a responsive layout
const stylesCss = `/* public/styles.css */
body {
  font-family: Arial, sans-serif;
}

header, footer {
  text-align: center;
}

/* Responsive design using media queries */
@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  body {
    background-color: lightgreen;
  }
}

@media (min-width: 1025px) {
  body {
    background-color: lightcoral;
  }
}`;