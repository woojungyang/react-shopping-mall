import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { OrderState, getOrderState } from "models/order";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import useUserQuery from "hooks/query/useUserQuery";
import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { Table, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";
import SearchFilter from "../SearchFilter";

export default function MyPageContent() {
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

  function onClickStage(stageId) {
    changeSelectedOrderState(stageId);
    changeStartDate(formatDateTime(addMonths(now(), -3)));
    changeEndDate(formatDateTime(now()));
  }

  return (
    <MyPageLayout>
      <div className={styles.order_wrapper}>
        <p className={styles.order_title}>
          진행중인 주문 <span>최근 3개월</span>
        </p>
        <div className={styles.order_stages_wrapper}>
          <div className={styles.order_stages_wrap}>
            {orderStages.map((stage, index) => (
              <div key={index} className={styles.stage}>
                <p
                  className={styles.order_count}
                  onClick={() => onClickStage(stage.id)}
                >
                  {numberWithCommas(stage.count)}
                </p>
                <p className={styles.order_label}>{stage.label}</p>
                {index + 1 != orderStages.length && <ChevronRightIcon />}
              </div>
            ))}
          </div>
          <div className={styles.order_canceled_wrap}>
            {canceledStage.map((stage) => (
              <div
                onClick={() => onClickStage(stage.id)}
                className={styles.default_flex_space}
              >
                <p>{stage.label}</p>
                <p>{stage.count}</p>
              </div>
            ))}
          </div>
        </div>

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

        <div className={styles.order_list_table}>
          <Table
            headers={[
              { label: "주문일" },
              { label: "주문번호", width: "18%" },
              { label: "상품정보", width: "40%" },
              { label: "수량" },
              { label: "상품금액" },
              { label: "진행상황" },
            ]}
            filterOptions={Object.entries(OrderState).map((e) => ({
              id: e[1],
              label: getOrderState(e[1]),
            }))}
            selectedOption={selectedOrderState}
            onChangeOption={changeSelectedOrderState}
          >
            {orderList.map((order) =>
              order.products.map((product, index) => (
                <TableRow cursor={false} key={`${order.id}-${product.id}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={order.products.length}>{order.orderDate}</td>
                      <td
                        rowSpan={order.products.length}
                        onClick={() =>
                          navigation(`/my-order/my-order-list/${order.id}`)
                        }
                        className={styles.order_number}
                      >
                        {order.orderNumber}
                      </td>
                    </>
                  )}
                  <td
                    className={styles.order_product_wrap}
                    onClick={() => navigation(`/items/${product.id}`)}
                  >
                    <div className={styles.order_info}>
                      <img src={require(`assets/images/sub/sub12.jpg`)} />
                      <div className={styles.order_item}>
                        <p className={styles.item_name}>{product.itemName}</p>
                        <p>옵션: {product.option}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.price.toLocaleString()}</td>
                  <td className="order-status">
                    {getOrderState(product.state)}
                    <br />
                    {product.state === OrderState.ConfirmedOrder && (
                      <button className={styles.cancel_button}>취소신청</button>
                    )}
                  </td>
                </TableRow>
              )),
            )}
          </Table>
        </div>
      </div>
    </MyPageLayout>
  );
}

const orderStages = [
  { id: OrderState.PendingPayment, label: "결제대기", count: 1 },
  { id: OrderState.ConfirmedOrder, label: "주문접수", count: 1 },
  { id: OrderState.Preparing, label: "상품준비중", count: 2 },
  { id: OrderState.Delivery, label: "배송중", count: 3 },
  { id: OrderState.CompletedDelivery, label: "배송완료", count: 4 },
  { id: OrderState.ConfirmedPurchase, label: "구매 확정", count: 4 },
];

const canceledStage = [
  { id: OrderState.CanceledOrder, label: "취소", count: 2 },
  { id: OrderState.PendingRefund, label: "반품", count: 1 },
  { id: OrderState.PendingExchange, label: "교환", count: 1 },
];

const orderList = Array.from({ length: 5 }, (v, index) => ({
  id: index,
  orderDate: formatDateTime(now()),
  orderNumber: nanoid(),
  products: Array.from({ length: index + 1 }, (v, index) => ({
    id: index,
    itemName: "item" + nanoid(),
    option: "skyblue",
    quantity: index + 1,
    price: 12344 + index,
    state:
      Object.values(OrderState)[
        Math.floor(Math.random() * Object.values(OrderState).length)
      ],
  })),
}));
