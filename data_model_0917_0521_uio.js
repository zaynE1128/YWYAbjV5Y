// 代码生成时间: 2025-09-17 05:21:58
const mongoose = require('mongoose');

// Define a schema for User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in other parts of the application
module.exports = User;

/**
 * @function createUser
 * Creates a new user in the database.
 * @param {Object} userData - User data to create.
 * @returns {Promise} - A promise that resolves with the newly created user.
 */
function createUser(userData) {
  const newUser = new User(userData);
  return newUser.save();
}

/**
 * @function getUserById
 * Retrieves a user by their ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise} - A promise that resolves with the user document.
 */
function getUserById(userId) {
  return User.findById(userId).exec();
}

/**
 * @function updateUser
 * Updates a user's data.
 * @param {string} userId - The ID of the user to update.
 * @param {Object} updateData - The data to update the user with.
 * @returns {Promise} - A promise that resolves with the updated user.
 */
function updateUser(userId, updateData) {
  return User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
}

/**
 * @function deleteUser
 * Deletes a user by their ID.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise} - A promise that resolves with the result of the deletion.
 */
function deleteUser(userId) {
  return User.findByIdAndRemove(userId).exec();
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};