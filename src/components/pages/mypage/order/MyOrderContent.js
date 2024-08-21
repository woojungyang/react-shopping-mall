import React, { useEffect } from "react";

import { OrderState, getOrderState } from "models/order";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import useOrdersQuery from "hooks/query/useOrdersQuery";
import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { LoadingLayer } from "components/common";
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

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 5);
  const handleChangePage = (_event, page) => changePage(page);

  const { data: orders, isLoading } = useOrdersQuery({
    startDate: startDate,
    endDate: endDate,
    offset: offset,
    limit: limit,
    state: selectedOrderState,
  });

  useEffect(() => {
    changePage(1);
  }, [startDate, endDate, selectedOrderState]);

  if (isLoading) return <LoadingLayer />;

  return (
    <MyPageLayout>
      <div className={styles.order_wrapper}>
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
            page={page}
            total={orders?.total}
            count={getPageCount(orders?.total)}
            handleChangePage={handleChangePage}
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
            {orders?.data.map((order) =>
              order?.items?.map((item, index) => (
                <TableRow cursor={false} key={`${order.id}-${item.id}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={order?.items?.length}>
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td
                        rowSpan={order?.items?.length}
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
                    onClick={() => navigation(`/items/${item.id}`)}
                  >
                    <div className={styles.order_info}>
                      <img src={item.thumbnail} />
                      <div className={styles.order_item}>
                        <p className={styles.item_name}>{item.itemName}</p>
                        <p>옵션: {item.option}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{numberWithCommas(item.price)}원</td>
                  <td className="order-status">
                    {getOrderState(item.state)}
                    <br />
                    {item.state === OrderState.ConfirmedOrder && (
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
