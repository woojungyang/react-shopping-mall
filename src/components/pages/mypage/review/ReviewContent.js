import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { ReviewState } from "models/mypage";
import { useNavigate } from "react-router-dom";

import useReviewQuery from "hooks/query/useReviewQuery";
import useReviewsQuery from "hooks/query/useReviewsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { LoadingLayer } from "components/common";
import ReviewRating from "components/pages/detail/ReviewRating";
import { Table, TableRow } from "components/table";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";

export default function ReviewContent() {
  const navigation = useNavigate();

  const [reviewState, changeReviewState] = useQueryString(
    "reviewState",
    ReviewState.Waiting,
  );

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 15);
  const handleChangePage = (_event, page) => changePage(page);

  const { data: reviews, isLoading } = useReviewsQuery({
    offset: offset,
    limit: limit,
    state: reviewState,
  });

  const [selectedReview, setSelectedReview] = useState("");
  const { data: writtenReview, isLoading: reviewLoading } = useReviewQuery(
    selectedReview,
    {
      enabled: !!selectedReview,
    },
  );

  useEffect(() => {
    changePage(1);
  }, [reviewState]);

  return (
    <MyPageLayout childrenLoading={isLoading || reviewLoading}>
      <div className={styles.reviews_wrapper}>
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
              <p>
                {menu.label} ({reviews?.situation[menu.key]})
              </p>
            </div>
          ))}
        </div>
        {reviews?.total > 0 ? (
          <Table
            page={page}
            total={reviews?.total}
            showTotal={false}
            count={getPageCount(reviews?.total)}
            handleChangePage={handleChangePage}
            headers={[
              { label: "주문일" },
              { label: "주문번호", width: "18%" },
              { label: "상품정보", width: "40%" },
              { label: "만족도" },
              { label: "작성일" },
            ]}
          >
            {reviews?.data.map((review, index) => (
              <>
                <TableRow cursor={false} key={index}>
                  <td>{formatDateTime(review.createdAt)}</td>
                  <td
                    onClick={() =>
                      navigation(
                        `/mypage/my-order/my-order-list/${review.order.id}`,
                      )
                    }
                    className={styles.review_order_number}
                  >
                    {review.orderNumber}
                  </td>
                  <td>
                    <div
                      className={styles.review_item_info_wrap}
                      onClick={() => {
                        if (review.id == selectedReview) setSelectedReview("");
                        else setSelectedReview(review.id);
                      }}
                    >
                      <img src={review.item?.thumbnail} />
                      <div className={styles.review_item_info}>
                        <p className={styles.brand}>{review?.brand?.name}</p>
                        <p>{review?.item?.itemName}</p>
                        <p className={styles.option}>
                          옵션 : {review?.item?.color} | {review?.item?.size}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.review_rate}>
                      <ReviewRating value={review?.reviewRate} />
                      <p>({review?.reviewRate})</p>
                    </div>
                  </td>
                  <td>{formatDateTime(review?.writtenAt)}</td>
                  {reviewState == ReviewState.Waiting && <td>작성하기</td>}
                </TableRow>
                {writtenReview && selectedReview == review.id && (
                  <TableRow>
                    <td colSpan={5}>
                      <div className={styles.review_content_wrapper}>
                        <p>{writtenReview?.content?.text}</p>
                      </div>
                    </td>
                  </TableRow>
                )}
              </>
            ))}
          </Table>
        ) : (
          <div className={styles.empty_review}>
            <p>
              아직 리뷰를 작성할 수 있는 <br /> 주문내역이 없습니다.
            </p>
          </div>
        )}
      </div>
    </MyPageLayout>
  );
}

const reviewMenuList = [
  {
    id: ReviewState.Waiting,
    label: "작성 가능한 리뷰",
    key: "waiting",
  },
  {
    id: ReviewState.Complete,
    label: "작성된 리뷰",
    key: "complete",
  },
];

{
  /* <div className={styles.reviews_wrap}>
            {reviews?.data.map((review, index) => (
              <div className={styles.review_wrapper}>
                <p className={styles.review_index}>{index + 1 + offset}</p>
                <p className={styles.review_order_number}>
                  {review?.orderNumber}
                </p>
                <div className={styles.review_item_info_wrap}>
                  {review.item?.thumbnail}
                  {review?.item?.color} || {review?.item?.size}
                </div>
                <p className={styles.review_rate}>{review?.reviewRate}</p>
                <p className={styles.review_date}>
                  {formatDateTime(review?.writtenAt)}
                </p>
              </div>
            ))}
          </div> */
}
