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
import Order from "./Order";

export default function MyOrderContentMb() {
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
        <div className={styles.order_table_wrap}>
          <Table pagination={false}>
            {orders?.pages?.flatMap((page) =>
              page.data.map((order, index) => (
                <TableRow
                  key={index}
                  onClick={() =>
                    navigation(`/mypage/my-order/my-order-list/${order.id}`)
                  }
                >
                  <td
                    className={styles.order_content}
                    style={{
                      borderBottom: ordersTotal === page.data.length ? 0 : "",
                    }}
                  >
                    <div className={styles.order_header}>
                      <p className={styles.order_number}>
                        {formatDateTime(order.createdAt)} |
                        <span> {order.orderNumber}</span>
                      </p>
                      <ChevronRightIcon />
                    </div>
                    <div className={styles.order_body}>
                      {order.items?.map((item) => (
                        <Order key={item.id} item={item} />
                      ))}
                    </div>
                    <DefaultButton
                      label="주문상세"
                      className={
                        styles.button_background_100_outline_color_dark_300
                      }
                      onClick={() =>
                        navigation(`/mypage/my-order/my-order-list/${order.id}`)
                      }
                    />
                  </td>
                </TableRow>
              )),
            )}
          </Table>
          {isFetching ? (
            <Loading />
          ) : hasNextPage ? (
            <div className={styles.button_wrap}>
              <DefaultButton
                label="이전 주문 내역 더보기"
                className={styles.button_skeleton_100_color_background_100}
                onClick={() => fetchNextPage()}
              />
            </div>
          ) : null}
        </div>
      </div>
      <Drawer
        anchor="right"
        open={showFilter}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: 100000 }}
      >
        <div
          className={styles.order_header_filter_wrap}
          style={{ width: window.innerWidth * 0.8 }}
        >
          <div>
            <div className={styles.drawer_header}>
              <CloseIcon
                className={styles.header_icon}
                onClick={toggleDrawer(false)}
              />
              <p>필터</p>
              <RefreshIcon
                className={styles.header_icon}
                onClick={() => {
                  setOption("");
                  changeSelectedOrderState("");
                }}
              />
            </div>
            <div className={styles.drawer_content_wrap}>
              <p className={styles.title}>기간 설정</p>
              <SearchFilter
                startDate={startDate}
                endDate={endDate}
                updateDates={updateDates}
              />
            </div>
            <div className={styles.drawer_content_wrap}>
              <p className={styles.title}>주문 상태 설정</p>
              <TableFilter
                filterOptions={Object.entries(OrderState).map((e) => ({
                  id: e[1],
                  label: getOrderState(e[1]),
                }))}
                selectedOption={option}
                onClick={(id) => {
                  setOption(id);
                }}
              />
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <DefaultButton
              label="조회하기"
              onClick={() => {
                setShowFilter(false);
                changeSelectedOrderState(option);
              }}
            />
          </div>
        </div>
      </Drawer>
    </MobileLayout>
  );
}
