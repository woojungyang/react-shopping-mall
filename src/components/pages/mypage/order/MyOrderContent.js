import React, { useEffect, useState } from "react";

import { OrderState, getOrderState } from "models/order";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { Table, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";
import SearchFilter from "../SearchFilter";

export default function MyOrderContent() {
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

  return (
    <MyPageLayout>
      <div className={styles.order_wrapper}>
        <p className={styles.order_title}>
          나의 주문 현황 <span>최근 1년</span>
        </p>
        <div className={styles.order_stages}>
          {orderStages.map((stage, index) => (
            <div key={index} className={styles.stage}>
              <p className={styles.order_label}>{stage.label}</p>
              <p
                className={styles.order_count}
                onClick={() => {
                  console.log(formatDateTime(addMonths(now(), -12)));
                  changeSelectedOrderState(stage.id);
                  changeStartDate(formatDateTime(addMonths(now(), -12)));
                  changeEndDate(formatDateTime(now()));
                }}
              >
                {numberWithCommas(stage.count)}
              </p>
            </div>
          ))}
        </div>
        {/* <div className={styles.tab_wrapper}>
                  {orderTabMenu.map((order, index) => (
                    <p
                      key={index}
                      className={classNames({
                        [styles.tab]: true,
                        [styles.tab_active]: orderTab == order.id,
                      })}
                      onClick={() => changeOrderTab(order.id)}
                    >
                      {order.label}
                    </p>
                  ))}
                </div> */}
        <SearchFilter
          startDate={startDate}
          changeStartDate={changeStartDate}
          endDate={endDate}
          changeEndDate={changeEndDate}
        />
        <div className={styles.filter_description}>
          <p>
            * 한번에 조회 가능한 기간은 최대 6개월이며 2008년 1월 1일 이후의
            주문에 대해서만 조회하실 수 있습니다.
          </p>
          <p>
            * 옵션 및 배송지 변경은 주문접수 또는 결제완료 상태일 경우
            주문상세조회에서 하실 수 있습니다.
          </p>
        </div>

        <Table
          headers={[
            { label: "진행상황" },
            { label: "주문일" },
            { label: "주문번호", width: "20%" },
            { label: "상품정보", width: "40%" },
            { label: "수량" },
            { label: "상품금액" },
          ]}
          filterOptions={Object.entries(OrderState).map((e) => ({
            id: e[1],
            label: getOrderState(e[1]),
          }))}
          selectedOption={selectedOrderState}
          onChangeOption={changeSelectedOrderState}
        >
          {orderList?.map((e) => (
            <TableRow key={e.orderNumber}>
              <td>{getOrderState(e.state)}</td>
              <td>{e.orderDate}</td>
              <td>{e.orderNumber}</td>
              <td>{e.name}</td>
              <td>{e.quantity}</td>
              <td>{numberWithCommas(e.price)}원</td>
            </TableRow>
          ))}
        </Table>
      </div>
    </MyPageLayout>
  );
}

const menuList = [
  { id: 1, label: "주문관리" },
  { id: 2, label: "리뷰 작성" },
  { id: 3, label: "상품 Q&A" },
  { id: 4, label: "1:1문의 내역" },
  { id: 5, label: "회원정보 수정" },
  { id: 6, label: "공지사항" },
  { id: 7, label: "고객센터" },
];

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
  quantity: index,
  name: "item" + index,
  price: 12344 + index,
  state:
    Object.values(OrderState)[
      Math.floor(Math.random() * Object.values(OrderState).length)
    ],
}));
