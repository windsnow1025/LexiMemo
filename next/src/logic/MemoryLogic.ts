// DEPRECATED!!! 请用memory文件夹中的新MemoryLogic
// 认识|模糊|不认识的次数 -> 当日熟知度
export function getDailyFamiliarity(knownCount: number, unknownCount: number): number {
  let dailyFamiliarity = 0.5 * knownCount - 0.7 * unknownCount;
  console.log("dailyFamiliarity:"+dailyFamiliarity);
  return Math.min(Math.max(dailyFamiliarity, 0), 1);
}

// 今天熟知度 + 旧熟知度向量 -> 新熟知度向量
export function addToFamiliarityVector(familiarityVector: number[], dailyFamiliarity: number) {
  familiarityVector.push(dailyFamiliarity);
}

// 新熟知度向量 -> 熟知度
export function calculateWeightedFamiliarity(familiarityVector: number[]) {
  let weightedFamiliarity = 0;
  for (let i = 0; i < familiarityVector.length; i++) {
    weightedFamiliarity += Math.pow(0.5, familiarityVector.length - i + 1) * familiarityVector[i];
  }
  return weightedFamiliarity;
}

export function getNextInterval(weightedFamiliarity: number) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + Math.ceil(2 / (1 - weightedFamiliarity)));
  return currentDate.toISOString().slice(0, 10);
}