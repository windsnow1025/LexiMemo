import { loadModel, predict } from './LSTM';

test('ONNX model prediction', async () => {
  const session = await loadModel();
  const inputData = [
    [3, 2, 1],  // 记忆状态
    [4, 1, 2],
    [2, 3, 1]
  ];
  const intervalDays = [1, 2, 3];  // 间隔日期
  const output = await predict(session, inputData, intervalDays);
  console.log('Prediction:', output);
});