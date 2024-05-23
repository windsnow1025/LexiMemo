import {loadModel, predict} from './LSTM-Node';
import {getNextIntervalFromData} from './MemoryLogic-Node';

beforeAll(() => {
  const originalImplementation = Array.isArray;
  Array.isArray = jest.fn((type) => {
    if (type.constructor.name === "Float32Array" || type.constructor.name === "BigInt64Array") {
      return true;
    }
    return originalImplementation(type);
  });
});

test('ONNX model prediction', async () => {
  const session = await loadModel();
  const memoryHistory = [
    [3, 2, 1],
    [4, 1, 2],
    [3, 1, 0],
  ];
  const intervalDays = [1, 2, 6];
  const output = await predict(session, memoryHistory, intervalDays);
  const outputArray = Array.from(output);
  console.log('Prediction:', outputArray);
  const maxValue = Math.max(...outputArray);
  const maxIndex = outputArray.findIndex((value) => value === maxValue);
  console.log('MaxIndex:', maxIndex);
});

test('Memory Logic 1', async () => {
  const memoryHistory = [
    [3, 2, 1],
    [4, 1, 2],
    [3, 0, 2],
  ];
  const prevIntervalDays = [1, 2];
  const nextInterval = await getNextIntervalFromData(memoryHistory, prevIntervalDays);
  console.log('Next Interval:', nextInterval);
});

test('Memory Logic 2', async () => {
  const memoryHistory = [
    [4, 2, 0],
    [2, 0, 0],
    [2, 0, 0],
  ];
  const prevIntervalDays = [1, 3];
  const nextInterval = await getNextIntervalFromData(memoryHistory, prevIntervalDays);
  console.log('Next Interval:', nextInterval);
});

test('Memory Logic 3', async () => {
  const memoryHistory = [
    [4, 2, 0],
    [2, 0, 0],
    [2, 0, 1],
  ];
  const prevIntervalDays = [1, 3];
  const nextInterval = await getNextIntervalFromData(memoryHistory, prevIntervalDays);
  console.log('Next Interval:', nextInterval);
});