// 代码生成时间: 2025-10-01 22:57:50
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Bob Smith' },
];

// GET /users - Retrieve all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// GET /users/:id - Retrieve a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update an existing user
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex > -1) {
        users[userIndex] = {
            ...users[userIndex],
            name: req.body.name,
        };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Documentation for the API endpoints
/*
GET /users - Retrieves an array of all users.
GET /users/:id - Retrieves a user by their ID.
POST /users - Creates a new user.
PUT /users/:id - Updates an existing user.
DELETE /users/:id - Deletes a user by their ID.
*/