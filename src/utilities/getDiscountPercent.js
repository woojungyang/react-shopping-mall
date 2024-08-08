export function getDiscountPercent(value, compare) {
  return (((compare - value) / compare) * 100).toFixed(0);
}
