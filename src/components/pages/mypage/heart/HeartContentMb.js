import React, { useMemo, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import TuneIcon from "@mui/icons-material/Tune";
import { Drawer } from "@mui/material";
import { OrderState, getOrderState } from "models/order";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { ApiClientQuery } from "hooks/apiClient/useApiClient";
import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import {
  DefaultButton,
  Loading,
  LoadingLayer,
  MobileLayout,
} from "components/common";
import { Table, TableFilter, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import SearchFilter from "../SearchFilter";

export default function HeartContentMb() {
  const navigation = useNavigate();

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 5);

  const [startDate, endDate, updateDates] = useDateIntervalQueryString(
    "startDate",
    "endDate",
    formatDateTime(addMonths(now(), -1)),
    formatDateTime(now()),
  );
  const [selectedOrderState, changeSelectedOrderState] =
    useQueryString("selectedOrderState");

  const [showFilter, setShowFilter] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setShowFilter(newOpen);
  };
  const fetchOrders = async ({ pageParam = 0 }) => {
    const response = await ApiClientQuery({
      url: "/api/v1/orders",
      params: {
        offset: pageParam * limit,
        limit: limit,
      },
      method: "get",
    });
    return response;
  };

  const {
    data: orders,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery("orders", fetchOrders, {
    getNextPageParam: (lastPage, pages) => {
      const total = getPageCount(pages[0].total);
      if (pages.length < total) return pages.length + 1;
      else return undefined;
    },
  });
  const ordersTotal = useMemo(() => orders?.pages[0]?.total || 0, [orders]);

  const [option, setOption] = useState(selectedOrderState);

  if (isLoading) return <LoadingLayer />;

  return (
    <MobileLayout headerTitle="주문관리" isFooter={true}>
      <div className={styles.mobile_mypage_container} style={{ padding: 0 }}>
        <div className={styles.sort_wrap}>
          <p>전체 {ordersTotal}건</p>
          <button className={styles.sort_button} onClick={toggleDrawer(true)}>
            <TuneIcon />
            필터
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
