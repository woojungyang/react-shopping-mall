import DateTime from "@date-io/luxon";

const dateTime = new DateTime({ locale: "ko" });

/* 
오늘 날짜 반환
*/
export function now() {
  return dateTime.date();
}

/* 
날짜 형식에 맞춰 반환
*/
export function formatDateTime(value, format = "yyyy-MM-dd") {
  // 날짜를 주어진 형식으로 변환
  const date = dateTime.date(value);
  let dateTimeFormat = dateTime.formatByString(date, format.split("-w")[0]);

  if (format.includes("-w")) {
    const weekdayKorean = date
      .setLocale("ko")
      .toLocaleString({ weekday: "long" });
    // 변환된 형식에 요일 추가
    dateTimeFormat += ` ${weekdayKorean}`;
  }

  return dateTimeFormat;
}

/**
 * 월 단위 가감 연산
 */
export function addMonths(value, count) {
  return dateTime.addMonths(dateTime.date(value), count);
}
/**
 * 일 단위 가감 연산
 */
export function addDays(value, count) {
  return dateTime.addDays(dateTime.date(value), count);
}

/**
 * 월 기준 시작 날짜
 */
export function startOfMonth(value) {
  return dateTime.startOfMonth(dateTime.date(value));
}

/**
 * 월 기준 끝 날짜
 */
export function endOfMonth(value) {
  return dateTime.endOfMonth(dateTime.date(value));
}

/**
 * 날짜 간 차이 연산

 */
export function getDiffDateTime(value, comparing, unit = "days") {
  return dateTime.getDiff(dateTime.date(value), dateTime.date(comparing), unit);
}

/**
 * 전 날짜 비교
 */
export function isBeforeDateTime(value, comparing) {
  return dateTime.isBefore(dateTime.date(value), dateTime.date(comparing));
}

/**
 * 동일 날짜 비교
 
 */
export function isEqualDateTime(value, comparing) {
  return dateTime.isEqual(value, comparing);
}
