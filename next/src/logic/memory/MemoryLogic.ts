import {loadModel, predict} from "@/src/logic/memory/LSTM";
import {InferenceSession} from "onnxruntime-common";

/**
 * const memoryHistory = [
 *   [3, 2, 1],
 *   [4, 1, 2],
 *   [3, 1, 0]
 * ];
 * const intervalDays = [1, 2]; // 长度比memoryHistory少1
 * **/
async function getNextIntervalFromData(memoryHistory: number[][], prevIntervalDays: number[]) {
  const session = await loadModel();
  let nextInterval = 1;
  while (true) {
    const intervalDays = prevIntervalDays.push(nextInterval);
    const familiarityStatus = await getFamiliarityStatusFromData(session, memoryHistory, intervalDays);
    if (familiarityStatus == 2) {
      break;
    }
    nextInterval += 1;
  }
  return nextInterval;
}

async function getFamiliarityStatusFromData(session: InferenceSession, memoryHistory: number[][], intervalDays: number[]) {
  const output = await predict(session, memoryHistory, intervalDays);
  const outputArray = Array.from(output);
  console.log('Prediction:', outputArray);
  const maxValue = Math.max(...outputArray);
  return outputArray.findIndex(value => value === maxValue)
}

