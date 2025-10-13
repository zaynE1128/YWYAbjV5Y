// 代码生成时间: 2025-10-14 03:01:23
const express = require('express');
const { MLModel } = require('ml/dist/MLModel');
const { MLDataset } = require('ml/dist/MLDataset');
const { MLClassifier } = require('ml/dist/MLClassifier');
const fs = require('fs');
const path = require('path');

// 创建 Express 应用
const app = express();
const port = 3000;

// 加载模型文件
const modelPath = path.join(__dirname, 'disease_prediction_model.json');
let model;

try {
  const modelData = fs.readFileSync(modelPath);
  model = new MLModel(JSON.parse(modelData));
} catch (error) {
  console.error('Error loading model:', error);
  process.exit(1);
}

// 疾病预测路由
app.post('/predict', (req, res) => {
  // 解析请求体中的数据
  const features = req.body.features;
  if (!features) {
    return res.status(400).json({
      message: 'Missing features in request body'
    });
  }

  // 将特征转换为数据集
  const dataset = new MLDataset(features);

  // 使用模型进行预测
  try {
    const prediction = model.predict(dataset);
    res.json({
      prediction
    });
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Disease Prediction Model listening at http://localhost:${port}`);
});

// 文档说明
/*
 * Disease Prediction Model
 *
 * This is a simple Node.js application that uses a machine learning model
 * to predict diseases based on input features.
 *
 * The model is loaded from a JSON file and the application exposes a
 * single POST endpoint '/predict' where the features are sent as JSON in the request body.
 *
 * The application returns a JSON response with the predicted disease.
 *
 * Usage:
 * curl -X POST -H 'Content-Type: application/json' -d '{"features": [/* feature values */]}' http://localhost:3000/predict
 *
 * Error Handling:
 * - 400 Bad Request: Missing features in request body
 * - 500 Internal Server Error: Error during prediction
 */