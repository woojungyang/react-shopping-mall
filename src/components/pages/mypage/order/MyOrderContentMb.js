import React, { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import TuneIcon from "@mui/icons-material/Tune";
import { Drawer } from "@mui/material";
import { OrderState, getOrderState } from "models/order";
import { useNavigate } from "react-router-dom";

import useOrdersQuery from "hooks/query/useOrdersQuery";
import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import {
  DefaultButton,
  DefaultPagination,
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
  const handleChangePage = (_event, page) => changePage(page);

  const [startDate, endDate, updateDates] = useDateIntervalQueryString(
    "startDate",
    "endDate",
    formatDateTime(addMonths(now(), -1)),
    formatDateTime(now()),
  );
  const [selectedOrderState, changeSelectedOrderState] =
    useQueryString("selectedOrderState");

  const { data: orders, isLoading } = useOrdersQuery({
    startDate: startDate,
    endDate: endDate,
    offset: offset,
    limit: limit,
    state: selectedOrderState,
  });

  const [showFilter, setShowFilter] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setShowFilter(newOpen);
  };

  const [option, setOption] = useState(selectedOrderState);

  return (
    <MobileLayout headerTitle="주문관리" isFooter={true}>
      {isLoading && <LoadingLayer />}
      <div className={styles.mobile_mypage_container} style={{ padding: 0 }}>
        <div className={styles.sort_wrap}>
          <p>전체 {orders?.total}건</p>
          <button className={styles.sort_button} onClick={toggleDrawer(true)}>
            <TuneIcon />
            필터
          </button>
        </div>
        <div className={styles.order_table_wrap}>
          <Table pagination={false}>
            {orders?.data?.map((order, index) => (
              <TableRow
                key={index}
                onClick={() =>
                  navigation(`/my-order/my-order-list/${order.id}`)
                }
              >
                <td
                  className={styles.order_content}
                  style={{
                    borderBottom: orders?.data.length == index + 1 ? 0 : "",
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
                    {order?.items?.map((item, index) => (
                      <Order key={index} item={item} />
                    ))}
                  </div>
                  <DefaultButton
                    label="주문상세"
                    className={
                      styles.button_background_100_outline_color_dark_300
                    }
                    onClick={() =>
                      navigation(`/my-order/my-order-list/${order.id}`)
                    }
                  />
                </td>
              </TableRow>
            ))}
          </Table>

          <div className={styles.button_wrap}>
            <DefaultButton
              label="이전 주문 내역 더보기"
              className={styles.button_skeleton_100_color_background_100}
            />
          </div>
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
