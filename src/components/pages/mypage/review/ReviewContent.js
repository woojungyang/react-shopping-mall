import React, { useEffect } from "react";

import classNames from "classnames";
import { ReviewState } from "models/mypage";
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

export default function ReviewContent() {
  const navigation = useNavigate();

  const [reviewState, changeReviewState] = useQueryString(
    "reviewState",
    ReviewState.Waiting,
  );

  const [startDate, endDate, updateDates] = useDateIntervalQueryString(
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
      <div className={styles.review_wrapper}>
        <div className={styles.review_tab_menu_wrapper}>
          {reviewMenuList.map((menu, index) => (
            <div
              className={classNames({
                [styles.review_tab_menu_wrap]: true,
                [styles.active_tab]: reviewState == menu.id,
              })}
              onClick={() => changeReviewState(menu.id)}
              key={index}
            >
              <p>{menu.label} (0)</p>
            </div>
          ))}
        </div>
        <div className={styles.empty_review}>
          <p>
            아직 리뷰를 작성할 수 있는 <br /> 주문내역이 없습니다.
          </p>
        </div>
      </div>
    </MyPageLayout>
  );
}

const reviewMenuList = [
  {
    id: ReviewState.Waiting,
    label: "작성 가능한 리뷰",
  },
  {
    id: ReviewState.Complete,
    label: "작성된 리뷰",
  },
];
