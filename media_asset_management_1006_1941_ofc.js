// 代码生成时间: 2025-10-06 19:41:46
const fs = require('fs');
const path = require('path');

// MediaAssetManager class to handle media assets
class MediaAssetManager {
  constructor(baseDirectory) {
    this.baseDirectory = baseDirectory;
  }

  // List all media assets in the base directory
  async listAssets() {
    try {
      const files = await fs.promises.readdir(this.baseDirectory, { withFileTypes: true });
      return files.filter(file => file.isFile());
    } catch (error) {
      console.error('Error listing assets:', error);
      throw error;
    }
  }

  // Add a new media asset to the base directory
  async addAsset(assetPath) {
    try {
      const fullPath = path.join(this.baseDirectory, path.basename(assetPath));
      await fs.promises.copyFile(assetPath, fullPath);
      console.log(`Asset added: ${fullPath}`);
      return fullPath;
    } catch (error) {
      console.error('Error adding asset:', error);
      throw error;
    }
  }

  // Remove a media asset from the base directory
  async removeAsset(assetName) {
    try {
      const fullPath = path.join(this.baseDirectory, assetName);
      await fs.promises.unlink(fullPath);
      console.log(`Asset removed: ${fullPath}`);
      return fullPath;
    } catch (error) {
      console.error('Error removing asset:', error);
      throw error;
    }
  }
}

// Example usage
async function run() {
  const manager = new MediaAssetManager('./media_assets');
  try {
    const assets = await manager.listAssets();
    console.log('Assets:', assets);

    // Add a new asset
    const newAssetPath = './example.jpg';
    const addedAsset = await manager.addAsset(newAssetPath);
    console.log('Added asset:', addedAsset);

    // Remove an asset
    const assetToRemove = 'example.jpg';
    const removedAsset = await manager.removeAsset(assetToRemove);
    console.log('Removed asset:', removedAsset);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();