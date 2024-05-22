import {loadModel, predict} from './LSTM';
import {getNextIntervalFromData} from './MemoryLogic';

jest.mock('onnxruntime-web', () => {
  const originalModule = jest.requireActual('onnxruntime-web');
  return {
    ...originalModule,
    InferenceSession: {
      create: jest.fn().mockResolvedValue({
        run: jest.fn().mockResolvedValue({
          output: {data: new Float32Array([0.1, 0.9, 0.0])},
        }),
      }),
    },
  };
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
  expect(maxIndex).toBe(1);
});

test('Memory Logic', async () => {
  const memoryHistory = [
    [3, 2, 1],
    [4, 1, 2],
    [3, 1, 0],
  ];
  const prevIntervalDays = [1, 2];
  const nextInterval = await getNextIntervalFromData(memoryHistory, prevIntervalDays);
  console.log('Next Interval:', nextInterval);
  expect(nextInterval).toBeDefined();
});