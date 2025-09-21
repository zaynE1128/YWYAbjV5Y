// 代码生成时间: 2025-09-21 17:00:32
const fs = require('fs');
const path = require('path');

// Configuration
const backupFolder = './backups/';
const backupFile = 'data.json';

// Ensure the backup folder exists
fs.mkdir(backupFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

/**
 * Saves the data to a backup file.
 * @param {Object} data - The data to be backed up.
 */
function backupData(data) {
  const backupPath = path.join(backupFolder, backupFile);

  // Write data to the backup file
  fs.writeFile(backupPath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error backing up data:', err);
      throw err;
    }
    console.log('Data backed up successfully.');
  });
}

/**
 * Restores the data from the backup file.
 * @returns {Promise<Object>} - The restored data.
 */
function restoreData() {
  const backupPath = path.join(backupFolder, backupFile);

  // Read data from the backup file
  return new Promise((resolve, reject) => {
    fs.readFile(backupPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading backup file:', err);
        reject(err);
        return;
      }
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

// Example usage
const sampleData = {
  key: 'value',
  array: [1, 2, 3],
  bool: true,
};

backupData(sampleData)
  .then(() => restoreData())
  .then((restoredData) => {
    console.log('Restored data:', restoredData);
  }).catch((err) => {
    console.error('An error occurred:', err);
  });