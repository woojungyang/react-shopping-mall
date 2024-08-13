export function getDiscountPercent(value = 0, compare = 0) {
  return (((compare - value) / compare) * 100).toFixed(0);
}
