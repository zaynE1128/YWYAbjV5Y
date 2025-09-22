// 代码生成时间: 2025-09-22 15:29:23
const fs = require('fs');
const path = require('path');

// Configuration for the organizer
const config = {
  sourceDir: './source', // Source directory where files are located
  targetDir: './target', // Target directory where files should be organized
  extensions: ['txt', 'jpg', 'png', 'doc', 'docx', 'pdf'], // Extensions to be organized
};

// Function to create directory if it does not exist
function ensureDirExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (error) {
    console.error(`Error creating directory: ${error.message}`);
    process.exit(1);
  }
}

// Function to organize files based on their extensions
function organizeFiles() {
  const sourcePath = path.resolve(config.sourceDir);
  const targetPath = path.resolve(config.targetDir);

  ensureDirExists(targetPath);

  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      console.error(`Error reading source directory: ${err.message}`);
      process.exit(1);
    }

    files.forEach(file => {
      const fullPath = path.join(sourcePath, file);
      const stats = fs.statSync(fullPath);

      // Only process files, skip directories
      if (stats.isFile()) {
        const extension = path.extname(file).slice(1).toLowerCase();

        if (config.extensions.includes(extension)) {
          const targetDir = path.join(targetPath, extension);
          ensureDirExists(targetDir);

          const targetPath = path.join(targetDir, file);
          fs.rename(fullPath, targetPath, err => {
            if (err) {
              console.error(`Error moving file: ${err.message}`);
              process.exit(1);
            }
          });
        }
      }
    });
  });
}

// Run the organizer
organizeFiles();