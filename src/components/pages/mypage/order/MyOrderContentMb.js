import React, { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import TuneIcon from "@mui/icons-material/Tune";
import { Drawer } from "@mui/material";
import { OrderState, getOrderState } from "models/order";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { DefaultButton, MobileLayout } from "components/common";
import { Table, TableFilter, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import SearchFilter from "../SearchFilter";
import Order from "./Order";

export default function MyOrderContentMb() {
  const navigation = useNavigate();

  const [startDate, endDate, changeStartDate, changeEndDate] =
    useDateIntervalQueryString(
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

  const [option, setOption] = useState(selectedOrderState);

  return (
    <MobileLayout headerTitle="주문관리" isFooter={true}>
      <div className={styles.mobile_mypage_container} style={{ padding: 0 }}>
        <div className={styles.sort_wrap}>
          <p>전체 1건</p>
          <button className={styles.sort_button} onClick={toggleDrawer(true)}>
            <TuneIcon />
            필터
          </button>
        </div>
        <div className={styles.order_table_wrap}>
          <Table pagination={false}>
            {orderList?.map((order, index) => (
              <TableRow
                key={index}
                onClick={() =>
                  navigation(`/my-order/my-order-list/${order.id}`)
                }
              >
                <td
                  className={styles.order_content}
                  style={{
                    borderBottom: orderList.length == index + 1 ? 0 : "",
                  }}
                >
                  <div className={styles.order_header}>
                    <p className={styles.order_number}>
                      {order.orderDate} |<span> {order.orderNumber}</span>
                    </p>
                    <ChevronRightIcon />
                  </div>
                  <div className={styles.order_body}>
                    {order.products.map((product, index) => (
                      <Order key={index} product={product} />
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
          {/* <div>ddd</div> */}
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
                changeStartDate={changeStartDate}
                endDate={endDate}
                changeEndDate={changeEndDate}
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

const orderList = Array.from({ length: 8 }, (v, index) => ({
  id: index,
  orderDate: formatDateTime(now()),
  orderNumber: nanoid(),
  products: Array.from({ length: index + 1 }, (v, index) => ({
    id: index,
    itemName: "item" + nanoid(),
    option: "skyblue",
    quantity: index,
    price: 12344 + index,
    state:
      Object.values(OrderState)[
        Math.floor(Math.random() * Object.values(OrderState).length)
      ],
  })),
}));
