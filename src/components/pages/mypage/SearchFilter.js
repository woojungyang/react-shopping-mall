import React, { useEffect, useMemo, useState } from "react";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import classNames from "classnames";
import { DateTime } from "luxon";

import {
  addMonths,
  endOfMonth,
  formatDateTime,
  isBeforeDateTime,
  isEqualDateTime,
  now,
} from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function SearchFilter({
  startDate,
  changeStartDate,
  endDate,
  changeEndDate,
}) {
  const [currentActive, setCurrentActive] = useState(buttons[0].id);

  const [start, setStart] = useState(startDate);

  const [end, setEnd] = useState(endDate);

  useEffect(() => {
    setStart(startDate);
  }, [startDate]);

  useEffect(() => {
    setEnd(endDate);
  }, [endDate]);

  return (
    <div className={styles.search_filter_container}>
      <div className={styles.default_flex}>
        {buttons.map((button, index) => (
          <DefaultButton
            key={index}
            active={currentActive}
            button={button}
            onClick={() => {
              setCurrentActive(button.id);
              if (button.id == 1) {
                setStart(formatDateTime(addMonths(now(), -1)));
                setEnd(formatDateTime(now()));
              } else {
                const startDay = formatDateTime(
                  addMonths(now(), button.id == 2 ? -1 : -2),
                );
                const endDay = formatDateTime(endOfMonth(startDay));
                setStart(startDay);
                setEnd(endDay);
              }
            }}
          />
        ))}
      </div>
      <div className={styles.datepicker_wrap}>
        <CustomPicker value={start} onChange={setStart} />
        <p className={styles.datepicker_icon}>~</p>
        <CustomPicker value={end} onChange={setEnd} />
      </div>
      <DefaultButton
        button="조회"
        className={styles.filter_btn_search}
        onClick={() => {
          if (isBeforeDateTime(end, start))
            alert("종료일이 시작일보다 이전일 수 없습니다.");
          else {
            changeEndDate(end);
            changeStartDate(start);
          }
        }}
      />
    </div>
  );
}

function DefaultButton({ button, onClick, className, active }) {
  return (
    <button
      className={classNames({
        [className || styles.filter_btn_default]: true,
        [styles.filter_btn_active]: button?.id == active,
      })}
      onClick={onClick}
    >
      {button?.label || button}
    </button>
  );
}

function CustomPicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        maxDate={now()}
        sx={{
          backgroundColor: "white",
          "& .MuiInputBase-root": {
            width: "160px",
            height: "30px",
            borderRadius: 0,
            paddingRight: "8px",
            fontSize: "15px",
            color: "#888",
          },
          "& .MuiOutlinedInput-input": {
            padding: "6px 14px",
            marginRight: "0px",
            paddingRight: "0px",
          },
          "& .MuiSvgIcon-root": {
            marginRight: "4px",
            fontSize: "20px", // Adjust the icon size
          },
        }}
        format="yyyy-MM-dd"
        value={DateTime?.fromISO?.(value) || null}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}

const buttons = [
  { id: 1, label: "최근1개월" },
  { id: 2, label: `${formatDateTime(addMonths(now(), -1), "MM")}월` },
  { id: 3, label: `${formatDateTime(addMonths(now(), -2), "MM")}월` },
];
