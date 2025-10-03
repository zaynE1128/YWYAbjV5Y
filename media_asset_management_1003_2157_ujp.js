// 代码生成时间: 2025-10-03 21:57:53
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify the readFile function for better async handling
const readFile = util.promisify(fs.readFile);

class MediaAssetManager {

  // Initialize the Media Asset Manager with a storage directory
  constructor(storageDir) {
    this.storageDir = storageDir;
  }

  // Add a media asset to the storage directory
  async addAsset(assetPath) {
    try {
      // Check if the asset exists
      if (!fs.existsSync(assetPath)) {
        throw new Error('Asset does not exist.');
      }

      // Read the asset from the file system
      const assetData = await readFile(assetPath);

      // Get the asset's name and extension
      const assetName = path.basename(assetPath);
      const assetDir = path.join(this.storageDir, assetName);

      // Create a directory for the asset if it doesn't exist
      if (!fs.existsSync(assetDir)) {
        fs.mkdirSync(assetDir, { recursive: true });
      }

      // Write the asset to the new location
      fs.writeFileSync(path.join(assetDir, assetName), assetData);

      console.log(`Asset ${assetName} added successfully to ${assetDir}`);

    } catch (error) {
      console.error('Failed to add asset:', error.message);
    }
  }

  // Retrieve a media asset by name
  async getAsset(assetName) {
    try {
      // Construct the asset path
      const assetPath = path.join(this.storageDir, assetName);

      // Check if the asset exists
      if (!fs.existsSync(assetPath)) {
        throw new Error('Asset not found.');
      }

      // Read and return the asset data
      const assetData = await readFile(assetPath);
      return assetData;

    } catch (error) {
      console.error('Failed to retrieve asset:', error.message);
    }
  }
}

// Usage example
const storageDirectory = 'path/to/your/storage/directory';
const manager = new MediaAssetManager(storageDirectory);

const assetToAdd = 'path/to/your/asset.jpg';
manager.addAsset(assetToAdd).then(() => {
  console.log('Asset has been added.');
});

const assetToRetrieve = 'asset.jpg';
manager.getAsset(assetToRetrieve).then((data) => {
  if (data) {
    console.log('Asset retrieved successfully:', data);
  }
});