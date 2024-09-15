import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { ReviewState } from "models/mypage";
import { useNavigate } from "react-router-dom";

import useReviewMutation from "hooks/mutation/useReviewMutation";
import useReviewQuery from "hooks/query/useReviewQuery";
import useReviewsQuery from "hooks/query/useReviewsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { LoadingLayer } from "components/common";
import { ToastModal } from "components/modal";
import ReviewRating from "components/pages/detail/ReviewRating";
import { Table, TableRow } from "components/table";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";

export default function ReviewContent() {
  const navigation = useNavigate();

  const [toastMessage, setToastMessage] = useState("");

  const [reviewState, changeReviewState] = useQueryString(
    "reviewState",
    ReviewState.Waiting,
  );

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 15);
  const handleChangePage = (_event, page) => changePage(page);

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useReviewsQuery({
    offset: offset,
    limit: limit,
    state: reviewState,
  });

  const [selectedReviewId, setSelectedReviewId] = useState("");
  const [writtenReview, setWrittenReview] = useState({});
  const reviewQuery = useReviewQuery(selectedReviewId, {
    enabled: !!selectedReviewId,
    onSuccess: (res) => {
      setWrittenReview(res);
    },
  });

  const reviewMutation = useReviewMutation(selectedReviewId, "delete");
  async function requestDeleteReview() {
    try {
      await reviewMutation.mutateAsync();
      setSelectedReviewId("");
      refetch();
      if (page > 1 && getPageCount(reviews?.total) < page) changePage(page - 1);
      setToastMessage("삭제완료");
    } catch (err) {
      setToastMessage(err.message);
    }
  }

  useEffect(() => {
    changePage(1);
  }, [reviewState]);

  return (
    <MyPageLayout
      childrenLoading={
        isLoading || reviewQuery.isLoading || reviewMutation.isLoading
      }
    >
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
                        if (review.id == selectedReviewId)
                          setSelectedReviewId("");
                        else setSelectedReviewId(review.id);
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
                {writtenReview && selectedReviewId == review.id && (
                  <TableRow>
                    <td colSpan={5}>
                      <div className={styles.review_content_wrapper}>
                        <p>{writtenReview?.content?.text}</p>
                        <div className={styles.image_wrap}>
                          {writtenReview?.content?.photos?.map((photo) => (
                            <img src={photo.thumbnail} />
                          ))}
                        </div>
                        <div className={styles.review_btn_wrap}>
                          <button>수정</button>
                          <button onClick={requestDeleteReview}>삭제</button>
                        </div>
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
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </MyPageLayout>
  );
}

function ReviewForm({ review }) {
  return (
    <div className={styles.review_content_wrapper}>
      <textarea />
      <div className={styles.image_wrap}>
        {review?.content?.photos?.map((photo) => (
          <div>
            <img src={photo} />
          </div>
        ))}
      </div>
      <div className={styles.review_btn_wrap}>
        <button>저장</button>
      </div>
    </div>
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
