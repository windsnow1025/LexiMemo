import { loadModel, predict } from './LSTM';

test('ONNX model prediction', async () => {
  // Mock Array.isArray to handle Float32Array and BigInt64Array
  const originalImplementation = Array.isArray;
  Array.isArray = jest.fn((type) => {
    if (type.constructor.name === "Float32Array" || type.constructor.name === "BigInt64Array") {
      return true;
    }
    return originalImplementation(type);
  });

  try {
    const session = await loadModel();
    const inputData = [
      [3, 2, 1],  // 记忆状态
      [4, 1, 2],
      [2, 0, 0]
    ];
    const intervalDays = [1, 2, 6];  // 间隔日期
    const output = await predict(session, inputData, intervalDays);
    console.log('Prediction:', output);
  } finally {
    // Restore the original implementation after the test
    Array.isArray = originalImplementation;
  }
});