import React, { useState } from "react";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import classNames from "classnames";
import { DateTime } from "luxon";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function SearchFilter(
  startDate,
  changeStartDate,
  endDate,
  changeEndDate,
) {
  const [currentActive, setCurrentActive] = useState("최근1개월");
  const [value, setValue] = useState(DateTime.now());

  return (
    <div className={styles.search_filter_container}>
      <div className={styles.default_flex}>
        <DefaultButton active={currentActive} label="최근1개월" />
        <DefaultButton
          active={currentActive}
          label={`${formatDateTime(addMonths(now(), -1), "MM")}월`}
        />
        <DefaultButton
          active={currentActive}
          label={`${formatDateTime(addMonths(now(), -2), "MM")}월`}
        />
      </div>
      <div className={styles.default_flex}>
        <CustomPicker />
        <span>~</span>
        <CustomPicker />
      </div>
      <DefaultButton label="조회" className={styles.filter_btn_search} />
    </div>
  );
}

function DefaultButton({ label, onClick, className, active }) {
  return (
    <button
      className={classNames({
        [className || styles.filter_btn_default]: true,
        [styles.filter_btn_active]: label == active,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function CustomPicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
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
        value={value}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}
