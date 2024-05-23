import {loadModel, predict} from "./LSTM-Node.js";

/**
 * const memoryHistory = [
 *   [3, 2, 1],
 *   [4, 1, 2],
 *   [3, 1, 0]
 * ];
 * const prevIntervalDays = [1, 2]; // 长度比memoryHistory少1
 * **/
export async function getNextIntervalFromData(memoryHistory, prevIntervalDays) {
  const session = await loadModel();
  let intervalDays = [...prevIntervalDays, 1];
  while (true) {
    intervalDays[intervalDays.length - 1] += 1;
    const familiarityStatus = await getFamiliarityStatusFromData(session, memoryHistory, intervalDays);
    if (familiarityStatus === 1 || familiarityStatus === 2) {
      break;
    }
  }
  return intervalDays[intervalDays.length - 1];
}

async function getFamiliarityStatusFromData(session, memoryHistory, intervalDays) {
  const output = await predict(session, memoryHistory, intervalDays);
  const outputArray = Array.from(output);
  console.log('Prediction:', outputArray);
  const maxValue = Math.max(...outputArray);
  return outputArray.findIndex(value => value === maxValue)
}

