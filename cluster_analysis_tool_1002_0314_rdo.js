// 代码生成时间: 2025-10-02 03:14:19
// Import necessary libraries
const kmeans = require('ml-kmeans'); // ML.js library for k-means clustering

/**
 * Main clustering function
 * @param {Array<Array<number>>} dataset - The dataset to be clustered
 * @param {number} k - The number of clusters to form
 * @returns {Array<Array<number>>} Cluster assignments for each data point
 */
function performClustering(dataset, k) {
    // Check if dataset is valid
    if (!Array.isArray(dataset) || dataset.length === 0) {
        throw new Error('Invalid dataset. It should be a non-empty array.');
    }

    // Check if k is a positive integer
    if (typeof k !== 'number' || k <= 0 || k !== parseInt(k)) {
        throw new Error('k must be a positive integer.');
    }

    // Perform k-means clustering
    const clusters = kmeans(dataset, k);

    // Return cluster assignments
    return clusters;
}

/**
 * Example usage
 */
const dataset = [
    [1, 2],
    [1, 4],
    [1, 0],
    [4, 2],
    [4, 4],
    [4, 0]
];

const k = 2; // Number of clusters

try {
    const clusterAssignments = performClustering(dataset, k);
    console.log('Cluster Assignments:', clusterAssignments);
} catch (error) {
    console.error('Error performing clustering:', error.message);
}