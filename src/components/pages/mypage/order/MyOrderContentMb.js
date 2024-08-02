import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { numberWithCommas } from "utilities";

import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";

import { MobileLayout } from "components/common";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import SearchFilter from "../SearchFilter";

export default function MyOrderContentMb() {
  const [startDate, endDate, changeStartDate, changeEndDate] =
    useDateIntervalQueryString(
      "startDate",
      "endDate",
      formatDateTime(addMonths(now(), -1)),
      formatDateTime(now()),
    );
  return (
    <MobileLayout
      headerTitle="주문관리"
      isBottomNavigation={true}
      isFooter={true}
    >
      <div className={styles.mobile_mypage_container}>
        <SearchFilter
          startDate={startDate}
          changeStartDate={changeStartDate}
          endDate={endDate}
          changeEndDate={changeEndDate}
        />
      </div>
    </MobileLayout>
  );
}
