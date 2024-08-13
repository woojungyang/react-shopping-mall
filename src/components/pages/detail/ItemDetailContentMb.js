import React, { useEffect, useMemo, useRef, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getQuestionStateLabel } from "models/notice";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDiscountPercent,
  maskAccountName,
  numberWithCommas,
} from "utilities";

import useItemQuery from "hooks/query/useItemQuery";
import useItemQuestionsQuery from "hooks/query/useItemQuestionsQuery";
import useItemReviewsQuery from "hooks/query/useItemReviewsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import { useScrollToElement } from "hooks/scroll/useScrollToElement";

import { ItemCard, LikeHeart } from "components/card";
import {
  DefaultPagination,
  LoadingLayer,
  MobileLayout,
} from "components/common";
import { DefaultButton } from "components/common";
import { OptionsMobile } from "components/detail";
import { ToastModal } from "components/modal";
import { ImageZoomSlider, ScrollableSlider } from "components/slider";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_detail.module.scss";

import DeliveryDrawer from "./DeliveryDrawer";
import EmptyList from "./EmptyList";
import ReviewRating from "./ReviewRating";
import TabsWrapper from "./TabsWrapper";

export default function ItemDetailContentMb() {
  const navigation = useNavigate();

  const [toggleDelivery, setToggleDelivery] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);

  const today = useMemo(() => formatDateTime(now(), "MM월dd일-w"), []);

  const [selectedItemOptions, setSelectedOptions] = useState({
    color: 0,
    quantity: 1,
  });

  const toggleDrawer = (newOpen) => () => {
    setDeliveryModal(newOpen);
  };

  const detailRef = useRef(null);

  const [moreContents, setMoreContents] = useState(true);

  const { scrollToElement, setElementRef } = useScrollToElement();

  const [showOptionModal, setShowOptionModal] = useState(false);
  const [optionsChanges, setOptionChanges] = useState({});

  useEffect(() => {
    setTimeout(() => {
      if (detailRef.current) {
        const clientHeight = detailRef.current.clientHeight;
        setMoreContents(clientHeight > 500);
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (showOptionModal) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOptionModal]);

  const [toastMessage, setToastMessage] = useState("");

  const { id } = useParams();
  const { data: item, isLoading } = useItemQuery(id, {
    onSuccess: (data) => {
      setSelectedOptions({ ...selectedItemOptions, color: data.colors[0]?.id });
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
  });

  const [
    { page: reviewPage, perPage: limit, offset: reviewOffset },
    changePage,
    getPageCount,
  ] = usePageQueryString("reviewPage", 4);
  const handleChangePage = (_event, page) => changePage(page);
  const { data: reviews, isLoading: reviewLoading } = useItemReviewsQuery(
    id,
    { offset: reviewOffset, limit: limit },
    {
      onError: (error) => {
        setToastMessage(error.message);
      },
    },
  );

  const [
    { page: questionPage, perPage: questionLimit, offset: questionOffset },
    questionChangePage,
  ] = usePageQueryString("questionPage", 4);
  const handleQuestionChangePage = (_event, page) => questionChangePage(page);
  const { data: questions, isLoading: questionLoading } = useItemQuestionsQuery(
    id,
    { offset: questionOffset, limit: questionLimit },
    {
      onError: (error) => {
        setToastMessage(error.message);
      },
    },
  );

  if (!item || isLoading || reviewLoading || questionLoading)
    return <LoadingLayer />;

  return (
    <MobileLayout isFooter={true}>
      <div className={styles.mobile_item_detail_container}>
        <div className={styles.item_content_scroll_wrapper}>
          <ImageZoomSlider images={item?.thumbnails} />
        </div>
        <div className={styles.item_content_information_wrapper}>
          <div className={styles.item_header_wrapper}>
            <div
              className={styles.item_brand_name}
              onClick={() => setToastMessage("준비중입니다.")}
            >
              <p>{item?.brand?.name}</p>
              <KeyboardArrowRightIcon />
            </div>
            <div className={styles.review_wrap}>
              <div className={styles.rating_wrap}>
                <ReviewRating
                  size={"1.2em"}
                  value={item?.reviewRate}
                  color="#F27A46"
                  readOnly
                />
                <strong>{item?.reviewRate}</strong>
              </div>
              <p
                className={styles.review_flag_button}
                onClick={() => scrollToElement("review")}
              >
                {numberWithCommas(1)}개 리뷰
                <KeyboardArrowRightIcon />
              </p>

              <ShareOutlinedIcon className={styles.share_icon} />
            </div>{" "}
            <h1 className={styles.item_name}>{item?.itemName}</h1>
          </div>
          <div className={styles.price_information_wrapper}>
            <p className={styles.original_price}>
              {numberWithCommas(item?.originalPrice)}원
            </p>
            <p className={styles.total_price}>
              <span className={styles.sale_percent}>
                {getDiscountPercent(item?.price, item?.originalPrice)}%
              </span>
              <strong>{numberWithCommas(item?.price)}</strong>원
            </p>
          </div>

          <div className={styles.delivery_wrap}>
            <div>
              <p className={styles.title}>상품정보</p>
              <p className={styles.delivery_content}>{item?.itemCode}</p>
            </div>
            <div>
              <p className={styles.title}>배송정보</p>
              <div className={styles.delivery_content}>
                <p>결제완료 후 평균 3일이내 출고 (공휴일 주문 건 제외)</p>
                <p>제작기간이 별도로 소요되는 상품의 경우 상세페이지 참조</p>
                <p className={styles.delivery_more_information}>
                  <span onClick={toggleDrawer(true)}>
                    배송/교환/반품/AS 관련 유의사항
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mobile_recommend_container}>
          <div className={styles.recommend_wrapper}>
            <h3>Recommended for you </h3>
            <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
              {item?.recommendedItems?.map((item, index) => (
                <img
                  onClick={() => navigation(`/items/${item?.id}`)}
                  src={item?.thumbnail}
                  key={index}
                  style={{
                    height: 150,
                    width: "100%",
                    minWidth: 120,
                  }}
                />
              ))}
            </ScrollableSlider>
          </div>
        </div>
        <div className={styles.mobile_tab_menu_container}>
          <TabsWrapper scrollToElement={scrollToElement} activeTab="detail" />
          <div ref={setElementRef("detail")} id="detail">
            <div
              className={styles.detail_content_bottom_wrapper}
              ref={detailRef}
              style={{
                maxHeight: !moreContents ? "100%" : 700,
                overflow: "hidden",
              }}
            >
              {item?.detailContents.map((detail, index) => (
                <img
                  src={detail?.content}
                  key={index}
                  style={{
                    width: "100%",
                  }}
                />
              ))}
            </div>
          </div>
          {moreContents && (
            <div className={styles.detail_more_button_wrapper}>
              <DefaultButton
                onClick={() => setMoreContents(!moreContents)}
                className={styles.button_background_100_outline_color_dark_300}
              >
                상품정보
                <KeyboardArrowDownIcon />
              </DefaultButton>
            </div>
          )}
          <div
            className={styles.mobile_recommend_container}
            style={{
              marginBottom: 30,
            }}
          >
            <div className={styles.recommend_wrapper}>
              <h3>Related items </h3>
              <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
                {item?.brand?.items.map((item, index) => (
                  <ItemCard
                    key={index}
                    showBrand={false}
                    item={item}
                    style={{
                      height: 300,
                      minWidth: 200,
                    }}
                  />
                ))}
              </ScrollableSlider>
            </div>
          </div>
          <div
            ref={setElementRef("review")}
            className={styles.review_bottom_container}
          >
            <TabsWrapper scrollToElement={scrollToElement} activeTab="review" />
            {reviews.total > 0 ? (
              <>
                <div className={styles.review_bottom_wrapper}>
                  <p className={styles.rating_title}>
                    상품 평균 만족도<span>({reviews?.total})</span>
                  </p>
                  <div className={styles.rating_wrapper}>
                    <ReviewRating size={"2em"} value={reviews?.averageRate} />
                    <span className={styles.rating_value}>
                      <p>
                        {reviews?.averageRate} <span> / 5.0</span>
                      </p>
                    </span>
                  </div>
                </div>
                <div className={styles.reviews_wrapper}>
                  {reviews?.data?.map((review, index) => (
                    <div className={styles.detail_review} key={index}>
                      <div className={styles.default_flex_space}>
                        <ReviewRating value={review?.reviewRate} />
                        <span className={styles.writer_info}>
                          {maskAccountName(review?.user?.username)}
                        </span>
                      </div>
                      <div className={styles.user_option_wrap}>
                        {review?.size} {review?.color}
                      </div>
                      <div className={styles.review_content_wrap}>
                        <img src={review?.thumbnail} alt="" />
                        <p className={styles.written_review}>
                          {review?.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <DefaultPagination
                  count={getPageCount(reviews?.total)}
                  page={reviewPage}
                  onChange={handleChangePage}
                />
              </>
            ) : (
              <EmptyList comment="이 상품의 첫번째 리뷰를 작성해주세요!" />
            )}
          </div>
          <div
            ref={setElementRef("q&a")}
            className={styles.questions_container}
          >
            <TabsWrapper scrollToElement={scrollToElement} activeTab="q&a" />
            {questions?.total > 0 ? (
              <>
                <div className={styles.questions_wrapper}>
                  {questions?.data?.map((question, index) => (
                    <div className={styles.question_detail_wrap} key={index}>
                      <div className={styles.question_detail_content}>
                        <span> {getQuestionStateLabel(question?.state)}</span>
                        <p>{question?.content}</p>
                      </div>
                      <div className={styles.question_detail_information}>
                        <p>{maskAccountName(question?.user?.username)}</p>
                        <span>{formatDateTime(question?.writtenAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <DefaultPagination
                  count={getPageCount(questions?.total)}
                  page={questionPage}
                  onChange={handleQuestionChangePage}
                />
              </>
            ) : (
              <EmptyList comment="등록된 상품 Q&A가 없습니다." />
            )}
          </div>
        </div>

        <div className={styles.order_bottom_container}>
          <div className={styles.default_flex}>
            <div className={styles.like_btn_wrap}>
              <LikeHeart
                position={{ position: "relative" }}
                defaultColor="dark"
              />
              <p>234</p>
            </div>
            <DefaultButton
              label="구매하기"
              onClick={() => setShowOptionModal(true)}
            />
          </div>
        </div>
        <DeliveryDrawer visible={deliveryModal} setVisible={setDeliveryModal} />
        {showOptionModal && (
          <OptionsMobile
            setVisible={setShowOptionModal}
            optionsChanges={showOptionModal}
            setOptionChanges={setOptionChanges}
            leftButton={{
              label: "바로구매",
              onClick: () => {},
            }}
            rightButton={{
              label: "쇼핑백에 담기",
              onClick: () => {
                setShowOptionModal(false);
              },
            }}
          />
        )}
      </div>
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </MobileLayout>
  );
}
