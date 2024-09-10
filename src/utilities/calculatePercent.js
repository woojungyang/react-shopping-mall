export function calculatePercent(current = 0, total = 0) {
  return ((current / (total - 1)) * 100).toFixed(0);
}
