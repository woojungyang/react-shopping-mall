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
