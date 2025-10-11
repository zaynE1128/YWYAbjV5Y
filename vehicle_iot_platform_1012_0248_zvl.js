// 代码生成时间: 2025-10-12 02:48:31
 * Features:
 * - Device registration
 * - Data sending and receiving
 * - Basic error handling
 * - Documentation and comments for clarity
 */

const http = require('http');
const fs = require('fs');
const util = require('util');

// Define a class for the Vehicle IoT Platform
class VehicleIoTPlatform {
  // Constructor to initialize the platform with a port number
  constructor(port) {
    this.port = port;
    this.devices = new Map(); // Stores registered devices
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  // Start the server
  start() {
    this.server.listen(this.port, () => {
      console.log(`Vehicle IoT Platform is running on port ${this.port}`);
    });
  }

  // Handle HTTP requests
  handleRequest(request, response) {
    if (request.method === 'POST') {
      // Process POST request for device data
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
      });
      request.on('end', () => {
        this.processDeviceData(body);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Data received');
      });
    } else if (request.method === 'GET') {
      // Process GET request for device registration
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
      });
      request.on('end', () => {
        this.registerDevice(body);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Device registered');
      });
    } else {
      // Unsupported HTTP method
      response.writeHead(405, {'Content-Type': 'text/plain'});
      response.end('Method Not Allowed');
    }
  }

  // Process device data
  processDeviceData(data) {
    try {
      // Parse the JSON data sent by the device
      const deviceData = JSON.parse(data);
      // Check if the device ID exists
      if (!this.devices.has(deviceData.id)) {
        throw new Error('Device not registered');
      }
      // Simulate processing the data (e.g., storing in a database)
      console.log(`Received data from device ${deviceData.id}:`, deviceData);
    } catch (error) {
      console.error(`Error processing device data: ${error.message}`);
    }
  }

  // Register a new device
  registerDevice(data) {
    try {
      // Parse the JSON data sent by the device
      const deviceInfo = JSON.parse(data);
      // Check if the device ID already exists
      if (this.devices.has(deviceInfo.id)) {
        throw new Error('Device ID already registered');
      }
      // Register the device
      this.devices.set(deviceInfo.id, deviceInfo);
      console.log(`Device registered: ${JSON.stringify(deviceInfo)}`);
    } catch (error) {
      console.error(`Error registering device: ${error.message}`);
    }
  }
}

// Create an instance of the VehicleIoTPlatform
const platform = new VehicleIoTPlatform(3000);

// Start the platform
platform.start();