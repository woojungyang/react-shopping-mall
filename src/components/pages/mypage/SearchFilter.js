import React, { useEffect, useState } from "react";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import classNames from "classnames";
import { DateTime } from "luxon";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import {
  addMonths,
  endOfMonth,
  formatDateTime,
  isBeforeDateTime,
  isEqualDateTime,
  now,
  startOfMonth,
} from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

const getMonth = (month) => addMonths(now(), month);
const oneMonthAgo = formatDateTime(getMonth(-1));
const twoMonthAgo = formatDateTime(getMonth(-2));
const today = formatDateTime(now());

export default function SearchFilter({ startDate, endDate, updateDates }) {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [currentActive, setCurrentActive] = useState("");
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);

  useEffect(() => {
    setStart(startDate);
  }, [startDate]);

  useEffect(() => {
    setEnd(endDate);
  }, [endDate]);

  const handleSearch = () => {
    if (isBeforeDateTime(end, start))
      alert("종료일이 시작일보다 이전일 수 없습니다.");
    else updateDates(start, end);
  };

  useEffect(() => {
    const startDay = formatDateTime(start);
    const endDay = formatDateTime(end);

    const ranges = Array.from({ length: 3 }, (v, index) => ({
      id: buttons[index].id,
      start:
        index == 0
          ? oneMonthAgo
          : formatDateTime(startOfMonth(getMonth(index * -1))),
      end:
        index == 0 ? today : formatDateTime(endOfMonth(getMonth(index * -1))),
    }));

    const activeButton = ranges.find(
      ({ start, end, id }) =>
        isEqualDateTime(startDay, start) && isEqualDateTime(endDay, end),
    );

    setCurrentActive(activeButton ? activeButton.id : "");
  }, [start, end]);

  const [showDateFilter, setShowDateFilter] = useState(false);

  function handleButton(buttonId) {
    setCurrentActive(buttonId);
    if (buttonId !== 4) setShowDateFilter(false);
    if (buttonId === 1) {
      setStart(oneMonthAgo);
      setEnd(today);
    } else if (buttonId === 4) setShowDateFilter(true);
    else {
      const startDay = buttonId === 2 ? oneMonthAgo : twoMonthAgo;
      const endDay = formatDateTime(endOfMonth(startDay));
      setStart(formatDateTime(startOfMonth(startDay)));
      setEnd(endDay);
    }
  }

  return (
    <>
      {isDeskTop ? (
        <div className={styles.search_filter_container}>
          <div className={styles.default_flex}>
            {buttons.map((button, index) => (
              <DefaultButton
                key={index}
                active={currentActive}
                button={button}
                onClick={() => handleButton(button.id)}
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
            onClick={handleSearch}
          />
        </div>
      ) : (
        <div className={styles.mobile_search_filter_container}>
          <div className={styles.mobile_search_filter_button_wrap}>
            {[...buttons.concat({ id: 4, label: "기간조회" })].map(
              (button, index) => (
                <p
                  key={index}
                  className={classNames({
                    [styles.button_active]: currentActive == button.id,
                  })}
                  onClick={() => handleButton(button.id)}
                >
                  {button.label}
                </p>
              ),
            )}
          </div>
          {showDateFilter && (
            <div className={styles.datepicker_wrap}>
              <CustomPicker
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                  updateDates(newValue, endDate);
                }}
                isDeskTop={false}
              />
              <p className={styles.datepicker_icon}>-</p>
              <CustomPicker
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
                  updateDates(startDate, newValue);
                }}
                isDeskTop={false}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function DefaultButton({ button, onClick, className, active }) {
  return (
    <button
      className={classNames({
        [className || styles.filter_btn_default]: true,
        [styles.filter_btn_active]: button?.id === active,
      })}
      onClick={onClick}
    >
      {button?.label || button}
    </button>
  );
}

function CustomPicker({ value, onChange, isDeskTop = true }) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        maxDate={now()}
        sx={{
          backgroundColor: "white",
          "& .MuiInputBase-root": {
            maxWidth: isDeskTop ? "160px" : "auto",
            width: "100%",
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
            fontSize: "20px",
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
  { id: 2, label: `${formatDateTime(oneMonthAgo, "MM")}월` },
  { id: 3, label: `${formatDateTime(twoMonthAgo, "MM")}월` },
];
