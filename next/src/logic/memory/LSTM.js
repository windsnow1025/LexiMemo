import * as ort from 'onnxruntime-node';

// Polyfill for setImmediate
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (callback, ...args) => {
    return setTimeout(callback, 0, ...args);
  };
}

// 加载ONNX模型
export function loadModel() {
  return ort.InferenceSession.create('src/logic/memory/lstm_model.onnx');
}

// 进行推理
export async function predict(session, inputData, intervalDays) {
  // 将记忆状态和间隔日期组合在一起
  const combinedData = inputData.map((data, index) => [...data, intervalDays[index]]);
  const flatData = combinedData.flat();
  const tensor = new ort.Tensor('float32', Float32Array.from(flatData), [1, combinedData.length, combinedData[0].length]);
  const lengths = new ort.Tensor('int64', BigInt64Array.from([BigInt(combinedData.length)]), [1]);
  const feeds = { input: tensor, lengths: lengths };
  const results = await session.run(feeds);
  return results.output.data;
}