export function numberToKorean(number) {
  if (number < 10000) {
    return number.toString();
  }

  const units = ["", "만", "억", "조", "경"];
  let unitIndex = 0;
  let formattedNumber = number;

  while (formattedNumber >= 10000 && unitIndex < units.length - 1) {
    formattedNumber /= 10000;
    unitIndex++;
  }

  formattedNumber = Math.floor(formattedNumber * 10) / 10; // 소수점 첫째 자리까지 남기기
  return `${formattedNumber}${units[unitIndex]}`;
}
