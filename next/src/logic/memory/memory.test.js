import { loadModel, predict } from './LSTM';
import {getNextIntervalFromData} from "./MemoryLogic";

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
    // 记忆状态
    const memoryHistory = [
      [3, 2, 1],
      [4, 1, 2],
      [3, 1, 0]
    ];
    // 间隔日期
    const intervalDays = [1, 2, 6];
    const output = await predict(session, memoryHistory, intervalDays);
    const outputArray = Array.from(output);
    console.log('Prediction:', outputArray);
    // 找到最大值的索引
    const maxValue = Math.max(...outputArray);
    const maxIndex = outputArray.findIndex(value => value === maxValue);
    console.log('MaxIndex:', maxIndex);
  } finally {
    // Restore the original implementation after the test
    Array.isArray = originalImplementation;
  }
});

test('Memory Logic', async () => {
  // Mock Array.isArray to handle Float32Array and BigInt64Array
  const originalImplementation = Array.isArray;
  Array.isArray = jest.fn((type) => {
    if (type.constructor.name === "Float32Array" || type.constructor.name === "BigInt64Array") {
      return true;
    }
    return originalImplementation(type);
  });

  const memoryHistory = [
    [3, 2, 1],
    [4, 1, 2],
    [3, 1, 0]
  ];
  // 间隔日期
  const prevIntervalDays = [1, 2];
  const nextInterval = await getNextIntervalFromData(memoryHistory, prevIntervalDays);
  console.log('Next Interval:', nextInterval);
});
