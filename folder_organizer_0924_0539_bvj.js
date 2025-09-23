// 代码生成时间: 2025-09-24 05:39:53
const fs = require('fs');
const path = require('path');

// Function to get all files in a directory
const getAllFiles = (directory) => {
  const files = [];
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath)); // Recursively add files from subdirectories
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

// Function to organize files into specified categories
const organizeFiles = (directory, categories) => {
  try {
    const files = getAllFiles(directory);
    files.forEach(file => {
      const extension = path.extname(file).slice(1).toLowerCase();
      const categoryDirectory = path.join(directory, categories[extension]);
      
      if (!fs.existsSync(categoryDirectory)) {
        fs.mkdirSync(categoryDirectory); // Create category directory if it does not exist
      }
      
      const fileName = path.basename(file);
      const destination = path.join(categoryDirectory, fileName);
      fs.renameSync(file, destination); // Move file to category directory
    });
  } catch (error) {
    console.error('Error organizing files:', error);
  }
};

// Define file categories based on extensions
const fileCategories = {
  'js': 'JavaScript',
  'html': 'HTML',
  'css': 'CSS',
  'txt': 'Text',
  // Add more categories as needed
};

// Main function that executes the organizer
const main = () => {
  const directory = path.join(__dirname, 'path/to/your/directory'); // Set the directory to organize
  organizeFiles(directory, fileCategories);
};

// Execute the main function
main();