import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { OrderState, getOrderState } from "models/order";
import { nanoid } from "nanoid";
import { numberWithCommas } from "utilities";

import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { DefaultButton, MobileLayout } from "components/common";
import { Table, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import SearchFilter from "../SearchFilter";
import Order from "./Order";

export default function MyOrderContentMb() {
  const [startDate, endDate, changeStartDate, changeEndDate] =
    useDateIntervalQueryString(
      "startDate",
      "endDate",
      formatDateTime(addMonths(now(), -1)),
      formatDateTime(now()),
    );
  const [selectedOrderState, changeSelectedOrderState] =
    useQueryString("selectedOrderState");

  return (
    <MobileLayout headerTitle="주문관리" isFooter={true}>
      <div className={styles.mobile_mypage_container} style={{ padding: 0 }}>
        <div className={styles.order_header_filter_wrap}>
          <SearchFilter
            startDate={startDate}
            changeStartDate={changeStartDate}
            endDate={endDate}
            changeEndDate={changeEndDate}
          />
          <div className={styles.order_stages_bg_white}>
            {orderStages.map((stage, index) => (
              <div key={index} className={styles.stage}>
                <div>
                  <p className={styles.order_count}>
                    {numberWithCommas(stage.count)}
                  </p>
                  <p className={styles.order_label}>{stage.label}</p>
                </div>
                {index + 1 < orderStages.length && (
                  <div className={styles.arrow_wrap}>
                    <ChevronRightIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.order_table_wrap}>
          <Table pagination={false}>
            {orderList?.map((order, index) => (
              <TableRow key={index}>
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
    </MobileLayout>
  );
}

const orderStages = [
  { id: OrderState.ConfirmedOrder, label: "주문접수", count: 1 },
  { id: OrderState.Preparing, label: "상품준비중", count: 2 },
  { id: OrderState.Delivery, label: "배송중", count: 3 },
  { id: OrderState.CompletedDelivery, label: "배송완료", count: 4 },
];

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
