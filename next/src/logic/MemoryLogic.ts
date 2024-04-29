function getDailyFamiliarity(knownCount: number, unknownCount: number): number {
  let dailyFamiliarity = 0.5 * knownCount - 0.7 * unknownCount;
  return Math.min(Math.max(dailyFamiliarity, 0), 1);
}

function addToFamiliarityVector(familiarityVector: number[], dailyFamiliarity: number) {
  familiarityVector.push(dailyFamiliarity);
}

function calculateWeightedFamiliarity(familiarityVector: number[]) {
  let weightedFamiliarity = 0;
  for (let i = 0; i < familiarityVector.length; i++) {
    weightedFamiliarity += Math.pow(0.5, familiarityVector.length - i + 1) * familiarityVector[i];
  }
  return weightedFamiliarity;
}

function getNextInterval(weightedFamiliarity: number) {
  return Math.ceil(2 / (1 - weightedFamiliarity));
}