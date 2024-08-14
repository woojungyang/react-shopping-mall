import React, { useEffect, useRef, useState } from "react";

import EastIcon from "@mui/icons-material/East";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Rating } from "@mui/material";
import { getQuestionStateLabel } from "models/notice";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDiscountPercent,
  maskAccountName,
  numberToKorean,
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
  ListContent,
  Loading,
  LoadingLayer,
} from "components/common";
import { CommonLayout, DefaultButton } from "components/common";
import {
  ColorOptions,
  DetailContentWrapper,
  QuantityOptions,
  SizeOptions,
} from "components/detail";
import { ConfirmModal } from "components/modal";
import { ImageZoomSlider, ScrollableSlider } from "components/slider";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_detail.module.scss";

import DeliveryDrawer from "./DeliveryDrawer";
import EmptyList from "./EmptyList";
import ReviewRating from "./ReviewRating";
import TabsWrapper from "./TabsWrapper";

export default function ItemDetailContent() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [toastMessage, setToastMessage] = useState("");

  const [selectedItemOptions, setSelectedOptions] = useState({});

  const { data: item, isLoading } = useItemQuery(id, {
    onSuccess: (data) => {
      setSelectedOptions(data.options.find((option) => option.inventory > 0));
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
  });

  const [
    { page: reviewPage, perPage: limit, offset: reviewOffset },
    changePage,
    getPageCount,
  ] = usePageQueryString("reviewPage", 5);
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
  ] = usePageQueryString("questionPage", 5);
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

  const [toggleDelivery, setToggleDelivery] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDeliveryModal(newOpen);
  };

  const detailRef = useRef(null);
  const [moreContents, setMoreContents] = useState(true);
  const { scrollToElement, setElementRef } = useScrollToElement();

  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmModalContents, setConfirmModalContents] = useState({});

  useEffect(() => {
    setTimeout(() => {
      if (detailRef.current) {
        const clientHeight = detailRef.current.clientHeight;
        setMoreContents(clientHeight > 1499);
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (selectedItemOptions?.size && !!selectedItemOptions?.quantity) {
      if (selectedItemOptions?.quantity > selectedItemOptions.inventory) {
        setToastMessage(
          `최대 구매 가능한 수량은${selectedItemOptions?.inventory}개 입니다. `,
        );
        setSelectedOptions({
          ...selectedItemOptions,
          quantity: selectedItemOptions.inventory,
        });
      }
    }
  }, [selectedItemOptions]);

  if (!item || isLoading) return <LoadingLayer />;

  return (
    <CommonLayout setToastMessage={setToastMessage} toastMessage={toastMessage}>
      <div className={styles.item_detail_container}>
        <div className={styles.item_detail_wrapper}>
          <div className={styles.item_content_scroll_wrapper}>
            <ImageZoomSlider images={item?.thumbnails} />
          </div>
          <div className={styles.item_content_information_wrapper}>
            <div className={styles.item_header_icon_wrapper}>
              <LikeHeart
                defaultColor="dark"
                position={{ position: "relative" }}
              />
              {numberToKorean(item?.likeCount)}
            </div>

            <div className={styles.item_header_wrapper}>
              <span className={styles.item_brand_name}>
                {item?.brand?.name} | {item?.itemCode}{" "}
              </span>
              <h1 className={styles.item_name}>{item?.itemName}</h1>
            </div>
            <div className={styles.price_information_wrapper}>
              <span className={styles.total_price}>
                {numberWithCommas(item?.price)}원
              </span>
              <p>
                <span className={styles.original_price}>
                  {numberWithCommas(item?.originalPrice)}원
                </span>
                <span className={styles.sale_percent}>
                  {getDiscountPercent(item?.price, item?.originalPrice)}%
                </span>
              </p>
            </div>
            <p className={styles.item_description}>{item?.description}</p>
            <DetailContentWrapper border={true}>
              <div className={styles.detail_delivery_wrapper}>
                <div
                  className={styles.detail_delivery_wrap}
                  onClick={() => setToggleDelivery(!toggleDelivery)}
                >
                  <p>
                    무료 (도서산간 추가 {numberWithCommas(3000)}) <br />
                    <span className={styles.delivery_description}>
                      <span className={styles.delivery_}>
                        {formatDateTime(
                          item?.scheduledToArriveDate,
                          "yyyy년 MM월 dd일",
                        )}{" "}
                        도착예정
                      </span>{" "}
                      (지금 결제 시)
                    </span>
                  </p>
                  {toggleDelivery ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </div>
                {toggleDelivery && (
                  <div className={styles.delivery_hidden_wrapper}>
                    <ListContent
                      content="당일 오후 1시까지의 입금 완료건에 대하여 당일 출고가
                      가능합니다."
                    />
                    <ListContent
                      content="배송기간은 주문일 혹은 입금일로부터 1일~3일이 소요됩니다.
                      (주말/공휴일 주문 건 제외)"
                    />
                    <ListContent content="일부 도서/산간 지역에는 배송비가 추가될 수 있습니다. 해당지역은 FAQ를 통해 확인 하실 수 있습니다. " />
                    <ListContent
                      content="제작기간이 별도로 소요되는 상품의 경우에는 상품설명에 있는
                      제작기간과 배송시기를 확인해 주시기 바랍니다."
                    />

                    <p className={styles.delivery_more_information}>
                      <span onClick={toggleDrawer(true)}>
                        배송/교환/반품/AS 관련 유의사항
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </DetailContentWrapper>
            <DetailContentWrapper title="리뷰" border={true}>
              <div className={styles.detail_review_content}>
                <div className={styles.detail_start_wrap}>
                  <Rating name="read-only" value={item?.reviewRate} readOnly />

                  <p>{item?.reviewRate}</p>
                </div>
                <p
                  className={styles.review_flag_button}
                  onClick={() => scrollToElement("review")}
                >
                  {numberWithCommas(reviews?.total)} 리뷰 보기
                </p>
              </div>
            </DetailContentWrapper>
            <ColorOptions
              selectedItemOptions={selectedItemOptions}
              setSelectedOptions={setSelectedOptions}
              colorOptions={item?.options?.reduce((acc, current) => {
                if (!acc.some((item) => item.color === current.color)) {
                  acc.push(current);
                }
                return acc;
              }, [])}
            />
            <SizeOptions
              selectedItemOptions={selectedItemOptions}
              setSelectedOptions={setSelectedOptions}
              sizeOptions={item?.options?.filter(
                (option) => option.color == selectedItemOptions.color,
              )}
            />
            <QuantityOptions
              selectedItemOptions={selectedItemOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <DefaultButton
              className={styles.button_dark_300_color_background_100}
              label="주문하기"
            />

            <DefaultButton
              className={styles.button_background_100_outline_color_dark_300}
              label="쇼핑백"
              onClick={() => {
                setConfirmModal(true);
                setConfirmModalContents({
                  title: "선택하신 상품이\n 쇼핑백에 추가 되었습니다.",
                  leftButton: {
                    label: "쇼핑 계속하기",
                    color: "skeleton",
                    onClick: () => setConfirmModal(false),
                  },
                  rightButton: {
                    label: "쇼핑백 확인",
                    onClick: () => navigation("/cart"),
                  },
                });
              }}
            />
          </div>
        </div>
        <div className={styles.recommend_container}>
          <div className={styles.recommend_wrapper}>
            <h3>Recommended for you </h3>
            <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
              {item?.recommendedItems?.map((recommend, index) => (
                <img
                  key={index}
                  onClick={() => navigation(`/items/${recommend.id}`)}
                  src={recommend?.thumbnail}
                  style={{
                    height: 200,
                    width: "100%",
                    minWidth: 120,
                  }}
                />
              ))}
            </ScrollableSlider>
          </div>
        </div>
        <div className={styles.tab_menu_container}>
          <TabsWrapper scrollToElement={scrollToElement} activeTab="detail" />
          <div ref={setElementRef("detail")} id="detail">
            <div
              className={styles.detail_content_bottom_wrapper}
              ref={detailRef}
              style={{
                maxHeight: !moreContents ? "100%" : 1500,
                overflow: "hidden",
              }}
            >
              {item?.detailContents.map((detail, index) => (
                <img
                  onClick={() => navigation(`/items/${item}`)}
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
            className={styles.recommend_container}
            style={{
              marginBottom: 150,
            }}
          >
            <div className={styles.recommend_wrapper}>
              <div className={styles.brand_information_card_wrapper}>
                <img src={item?.brand?.thumbnail} alt="" />
                <div className={styles.brand_information_content}>
                  <div className={styles.brand_texts}>
                    <h1>{item?.brand?.name}</h1>
                    <h4>{item?.brand?.copyright}</h4>
                    <div className={styles.preference_wrapper}>
                      <LikeHeart position={{ position: "relative" }} />
                      <span>{item?.brand?.likeCount}</span>
                    </div>
                  </div>
                  <DefaultButton
                    className={styles.brand_home_button}
                    onClick={() => setToastMessage("준비중입니다.")}
                  >
                    Brand Home
                    <EastIcon />
                  </DefaultButton>
                </div>
              </div>
              <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
                {item?.brand?.items.map((item, index) => (
                  <ItemCard
                    key={index}
                    showBrand={false}
                    item={item}
                    style={{
                      height: 300,
                      minWidth: 100,
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

            {reviewLoading ? (
              <Loading />
            ) : reviews?.total > 0 ? (
              <>
                <div className={styles.review_bottom_wrapper}>
                  <p className={styles.rating_title}>
                    상품 평균 만족도<span>({reviews?.total})</span>
                  </p>
                  <div className={styles.rating_wrapper}>
                    <ReviewRating size={"2.5em"} value={reviews?.averageRate} />
                    <span className={styles.rating_value}>
                      <span>{reviews?.averageRate}</span> / 5.0
                    </span>
                  </div>
                </div>
                <div className={styles.reviews_wrapper}>
                  {reviews?.data?.map((review, index) => (
                    <div className={styles.detail_review} key={index}>
                      <div className={styles.detail_first_content}>
                        <ReviewRating value={review?.reviewRate} />
                        <img src={review?.thumbnail} alt="" />
                      </div>
                      <div className={styles.detail_second_content}>
                        <div className={styles.detail_review_information}>
                          <p>
                            구매옵션 : {review?.item?.color}{" "}
                            {review?.item?.size}
                          </p>
                          <div className={styles.detail_review_writer}>
                            <span style={{ marginRight: 10 }}>
                              {maskAccountName(review?.user?.username)}
                            </span>
                            <span>{formatDateTime(review?.writtenAt)}</span>
                          </div>
                        </div>
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
            {questionLoading ? (
              <Loading />
            ) : questions?.total > 0 ? (
              <>
                <div
                  className={styles.questions_wrapper}
                  onClick={() => setToastMessage("준비중입니다.")}
                >
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
        <DeliveryDrawer
          visible={deliveryModal}
          setVisible={setDeliveryModal}
          brand={item?.brand}
        />
        {confirmModal && (
          <ConfirmModal
            visible={confirmModal}
            setVisible={setConfirmModal}
            contents={confirmModalContents}
          />
        )}
      </div>
    </CommonLayout>
  );
}
