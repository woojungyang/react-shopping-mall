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
  now,
} from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function SearchFilter({
  startDate,
  changeStartDate,
  endDate,
  changeEndDate,
}) {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [currentActive, setCurrentActive] = useState(buttons[0].id);
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);

  useEffect(() => {
    setStart(startDate);
  }, [startDate]);

  useEffect(() => {
    setEnd(endDate);
  }, [endDate]);

  const handleSearch = () => {
    if (isBeforeDateTime(end, start)) {
      alert("종료일이 시작일보다 이전일 수 없습니다.");
    } else {
      changeStartDate(start);
      changeEndDate(end);
    }
  };

  const [showDateFilter, setShowDateFilter] = useState(false);

  function handleButton(buttonId) {
    setCurrentActive(buttonId);
    if (buttonId !== 4) setShowDateFilter(false);
    if (buttonId === 1) {
      setStart(formatDateTime(addMonths(now(), -1)));
      setEnd(formatDateTime(now()));
    } else if (buttonId === 4) {
      setShowDateFilter(true);
    } else {
      const startDay = formatDateTime(
        addMonths(now(), buttonId === 2 ? -1 : -2),
      );
      const endDay = formatDateTime(endOfMonth(startDay));
      setStart(startDay);
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
                  changeStartDate(newValue);
                }}
                isDeskTop={false}
              />
              <p className={styles.datepicker_icon}>-</p>
              <CustomPicker
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
                  changeEndDate(newValue);
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
  { id: 2, label: `${formatDateTime(addMonths(now(), -1), "MM")}월` },
  { id: 3, label: `${formatDateTime(addMonths(now(), -2), "MM")}월` },
];
