import React, { useEffect, useMemo, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import classNames from "classnames";
import { ReviewState, reviewMenu } from "models/mypage";
import { useNavigate } from "react-router-dom";

import useCreateReviewMutation from "hooks/mutation/useCreateReviewMutation";
import useReviewMutation from "hooks/mutation/useReviewMutation";
import useReviewQuery from "hooks/query/useReviewQuery";
import useReviewsQuery from "hooks/query/useReviewsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import {
  DefaultButton,
  DefaultPagination,
  LoadingLayer,
  MobileLayout,
} from "components/common";
import { ToastModal } from "components/modal";
import ReviewRating from "components/pages/detail/ReviewRating";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function ReviewContentMb() {
  const navigation = useNavigate();

  const [toastMessage, setToastMessage] = useState("");

  const [reviewState, changeReviewState] = useQueryString(
    "reviewState",
    ReviewState.Waiting,
  );

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 10);
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
  const [patchMode, setPatchMode] = useState(false);
  const reviewQuery = useReviewQuery(selectedReviewId, {
    enabled: !!selectedReviewId && reviewState == ReviewState.Complete,
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
  async function requestPatchReview() {
    try {
      await reviewMutation.mutateAsync(writtenReview);
      setSelectedReviewId("");
      refetch();
      setPatchMode(false);
      setToastMessage("수정완료");
    } catch (err) {
      setToastMessage(err.message);
    }
  }

  const createReviewMutation = useCreateReviewMutation();
  async function requestPostReview() {
    try {
      await createReviewMutation.mutateAsync(writtenReview);
      setSelectedReviewId("");
      refetch();
      setPatchMode(false);
      setToastMessage("작성 완료");
    } catch (err) {
      setToastMessage(err.message);
    }
  }

  useEffect(() => {
    changePage(1);
    setWrittenReview({});
  }, [reviewState]);

  if (
    isLoading ||
    reviewQuery.isLoading ||
    reviewMutation.isLoading ||
    createReviewMutation.isLoading
  )
    return <LoadingLayer />;

  return (
    <MobileLayout headerTitle="상품리뷰" isFooter={true}>
      <div className={styles.mobile_mypage_container} style={{ padding: 0 }}>
        <div className={styles.reviews_wrapper}>
          <div className={styles.review_tab_menu_wrapper}>
            {reviewMenu.map((menu, index) => (
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
            <div className={styles.reviews_wrap}>
              {reviews?.data.map((review, index) => {
                const isComplete = reviewState == ReviewState.Complete;
                const compareReviewId = selectedReviewId == review.id;
                return (
                  <div key={index} className={styles.review}>
                    <div className={styles.order_info}>
                      <p>
                        주문일 :{" "}
                        {formatDateTime(review?.createdAt, "yyyy.MM.dd")}
                      </p>
                      <p
                        className={styles.order_number}
                        onClick={() =>
                          navigation(
                            `/mypage/my-order/my-order-list/${review.order.id}`,
                          )
                        }
                      >
                        주문상세
                      </p>
                    </div>
                    <div className={styles.review_body}>
                      <img src={review.item?.thumbnail} />
                      <div className={styles.review_item_info}>
                        <p className={styles.brand}>{review?.brand?.name}</p>
                        <p>{review?.item?.itemName}</p>
                        <p className={styles.option}>
                          옵션 : {review?.item?.color} | {review?.item?.size}
                        </p>
                      </div>
                    </div>

                    {patchMode && !isComplete && compareReviewId && (
                      <div className={styles.review_content_wrapper}>
                        <ReviewForm
                          review={writtenReview}
                          setReview={setWrittenReview}
                          onSubmit={requestPostReview}
                        />
                      </div>
                    )}
                    {writtenReview && isComplete && compareReviewId && (
                      <div className={styles.review_content_wrapper}>
                        {patchMode ? (
                          <ReviewForm
                            review={writtenReview}
                            setReview={setWrittenReview}
                            onSubmit={requestPatchReview}
                          />
                        ) : (
                          <>
                            <ReviewRating value={review?.reviewRate} />
                            <p className={styles.review_content}>
                              {writtenReview?.content?.text}
                            </p>
                            <div className={styles.image_wrap}>
                              {writtenReview?.content?.photos?.map((photo) => (
                                <img src={photo.thumbnail} />
                              ))}
                            </div>
                            <div className={styles.review_btn_wrap}>
                              <DefaultButton
                                label="수정"
                                className={
                                  styles.button_skeleton_100_color_background_100
                                }
                                onClick={() => setPatchMode(true)}
                              />
                              <DefaultButton
                                label="삭제"
                                onClick={requestDeleteReview}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {!compareReviewId && (
                      <DefaultButton
                        label={isComplete ? "리뷰 상세" : "리뷰 작성"}
                        className={
                          styles.button_background_100_outline_color_dark_300
                        }
                        onClick={() => {
                          if (isComplete) {
                            setWrittenReview({});
                            if (review.id == selectedReviewId)
                              setSelectedReviewId("");
                            else setSelectedReviewId(review.id);
                          } else {
                            setPatchMode(true);
                            setSelectedReviewId(review.id);
                          }
                        }}
                      />
                    )}
                  </div>
                );
              })}
              <DefaultPagination
                count={getPageCount(reviews?.total)}
                page={page}
                onChange={handleChangePage}
              />
            </div>
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
      </div>
    </MobileLayout>
  );
}

function ReviewForm({ review, setReview, onSubmit = () => {} }) {
  const [error, setError] = useState("");

  const maxPhotoLength = 5;
  const currentFileLength = useMemo(
    () => review?.content?.photos?.length || 0,
    [review?.content?.photos?.length],
  );

  const fileInput = useRef(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    const imageType = ["image/png", "image/jpg", "image/gif"];
    if (!imageType.includes(file.type)) {
      setError("이미지 파일만 첨부 가능합니다.");
    } else {
      const url = URL.createObjectURL(file);
      const newFile = {
        thumbnail: url,
        id: currentFileLength,
      };

      setReview({
        ...review,
        content: {
          ...review.content,
          photos:
            currentFileLength > 0
              ? review?.content?.photos?.concat(newFile)
              : [newFile],
        },
      });
    }
  };
  return (
    <div className={styles.review_content_form}>
      <div className={styles.star_rating}>
        <p>만족도 </p>
        <ReviewRating
          readOnly={false}
          size="1.2em"
          value={review?.reviewRate}
          onChange={(e) =>
            setReview({
              ...review,
              reviewRate: e.target.value,
            })
          }
        />
      </div>
      <textarea
        value={review?.content?.text}
        onChange={(e) =>
          setReview({
            ...review,
            content: { ...review.content, text: e.target.value },
          })
        }
      />
      <div className={styles.image_wrap}>
        {review?.content?.photos?.map((photo) => (
          <div className={styles.image}>
            <img src={photo.thumbnail} />
            <div
              className={styles.delete_icon}
              onClick={() =>
                setReview({
                  ...review,
                  content: {
                    ...review.content,
                    photos: review.content.photos.filter(
                      (e) => e.id !== photo.id,
                    ),
                  },
                })
              }
            >
              <ClearIcon />
            </div>
          </div>
        ))}
        {currentFileLength < maxPhotoLength && (
          <>
            <input
              type="file"
              ref={fileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div
              className={styles.more_button}
              onClick={() => fileInput.current.click()}
            >
              <AddIcon />
            </div>
          </>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <DefaultButton
        label="저장"
        className={styles.button_dark_300_color_background_100}
        onClick={() => {
          if (!review?.content?.text || review?.content?.text.length < 10)
            setError("후기는 10글자 이상 작성해주세요.");
          else onSubmit();
        }}
      />
    </div>
  );
}
