import React, { useEffect, useMemo, useRef, useState } from "react";

import { ChevronLeft } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShareIcon from "@mui/icons-material/Share";
import { Drawer, Rating } from "@mui/material";
import classNames from "classnames";
import { Device } from "models/device";
import { getQuestionStateLabel } from "models/notice";
import { useNavigate } from "react-router-dom";
import { maskAccountName, numberWithCommas, scrollTop } from "utilities";

import usePageQueryString from "hooks/queryString/usePageQueryString";
import { useScrollToElement } from "hooks/scroll/useScrollToElement";
import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard, LikeHeart } from "components/card";
import {
  DefaultPagination,
  ListContent,
  MobileLayout,
} from "components/common";
import { CommonLayout, DefaultButton } from "components/common";
import {
  ColorOptions,
  DetailContentWrapper,
  QuantityOptions,
  SizeOptions,
} from "components/detail";
import { ImageZoomSlider, ScrollableSlider } from "components/slider";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_detail.module.scss";

import DeliveryDrawer from "./DeliveryDrawer";
import EmptyList from "./EmptyList";
import ReviewRating from "./ReviewRating";
import TabsWrapper from "./TabsWrapper";

export default function ItemDetailContentMb() {
  const navigation = useNavigate();

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const colorOptions = [...new Array(3)];

  const [toggleDelivery, setToggleDelivery] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);

  const today = useMemo(() => formatDateTime(now(), "MM월dd일-w"), []);

  const [selectedItemOptions, setSelectedOptions] = useState({
    color: 0,
    quantity: 1,
  });

  const sizeOptions = [...new Array(5)];
  const disabled_size = 4;

  const toggleDrawer = (newOpen) => () => {
    setDeliveryModal(newOpen);
  };

  const detailRef = useRef(null);

  const [bestItems, setBestItems] = useState([...new Array(8)]);
  const [brandItems, setBrandItems] = useState([...new Array(5)]);
  const [moreContents, setMoreContents] = useState(true);

  const [reviews, setReviews] = useState([...new Array(5)]);
  const [
    { page: reviewPage, perPage: limit, offset: reviewOffset },
    changePage,
    getPageCount,
  ] = usePageQueryString("reviewPage", 5);
  const handleChangePage = (_event, page) => changePage(page);

  const [questions, setQuestions] = useState([...new Array(5)]);
  const [
    { page: questionPage, perPage: questionLimit, offset: questionOffset },
    questionChangePage,
  ] = usePageQueryString("questionPage", 5);
  const handleQuestionChangePage = (_event, page) => questionChangePage(page);

  const { scrollToElement, setElementRef } = useScrollToElement();

  useEffect(() => {
    setTimeout(() => {
      if (detailRef.current) {
        const clientHeight = detailRef.current.clientHeight;
        setMoreContents(clientHeight > (isDeskTop ? 1499 : 500));
      }
    }, 0);
  }, []);

  return (
    <MobileLayout>
      <div className={styles.mobile_item_detail_container}>
        <div className={styles.item_content_scroll_wrapper}>
          <ImageZoomSlider images={[...new Array(9)]} />
        </div>
        <div className={styles.item_content_information_wrapper}>
          <div className={styles.item_header_wrapper}>
            <span className={styles.item_brand_name}>
              brandName | WXWP30644-BKS{" "}
            </span>
            <h1 className={styles.item_name}>자가드 포켓 우븐 팬츠</h1>
          </div>
          <div className={styles.price_information_wrapper}>
            <p className={styles.original_price}>
              {numberWithCommas(149000)}원
            </p>
            <p className={styles.total_price}>
              <span className={styles.sale_percent}>20%</span>
              <strong>{numberWithCommas(149000)}</strong>원
            </p>
          </div>
          <div className={styles.review_wrap}>
            <div className={styles.rating_wrap}>
              <ReviewRating size={"1.2em"} value={1} color="#F27A46" readOnly />
              <strong>4.0</strong>
            </div>
            <p className={styles.review_flag_button}>
              {numberWithCommas(1)}개 리뷰
              <KeyboardArrowRightIcon />
            </p>
          </div>
          <div className={styles.delivery_wrap}>
            <p className={styles.title}>배송정보</p>
            <div className={styles.delivery_content}>
              <p>결제완료 후 평균 3일이내 출고 (공휴일 주문 건 제외)</p>
              <p>제작기간이 별도로 소요되는 상품의 경우 상세페이지 참조.</p>
              <p className={styles.delivery_more_information}>
                <span onClick={toggleDrawer(true)}>
                  배송/교환/반품/AS 관련 유의사항
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.mobile_recommend_container}>
          <div className={styles.recommend_wrapper}>
            <h3>Recommended for you </h3>
            <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
              {bestItems.map((item, index) => (
                <img
                  onClick={() => navigation(`/items/${item}`)}
                  src={require(`assets/images/sub/sub${index + 1}.jpg`)}
                  key={index}
                  style={{
                    height: isDeskTop ? 200 : 150,
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
                maxHeight: !moreContents ? "100%" : isDeskTop ? 1500 : 700,
                overflow: "hidden",
              }}
            >
              {bestItems.map((item, index) => (
                <img
                  onClick={() => navigation(`/items/${item}`)}
                  src={require(`assets/images/main/main${index + 1}.jpg`)}
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
              marginBottom: 50,
            }}
          >
            <div className={styles.recommend_wrapper}>
              <div className={styles.brand_information_card_wrapper}>
                <img src={require(`assets/images/main/main10.jpg`)} alt="" />
                <div className={styles.brand_information_content}>
                  <div className={styles.brand_texts}>
                    <p>브랜드명</p>
                    <h1>brandname</h1>
                    <h4>트렌드에 따라 유연하게 변화하는 컨템포러리 브랜드</h4>
                    <div className={styles.preference_wrapper}>
                      <LikeHeart position={{ position: "relative" }} />
                      <span>12345</span>
                    </div>
                  </div>
                  <DefaultButton className={styles.brand_home_button}>
                    Brand Home
                    <EastIcon />
                  </DefaultButton>
                </div>
              </div>
              <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
                {brandItems.map((item, index) => (
                  <ItemCard
                    key={index}
                    showBrand={false}
                    product={item}
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
            {reviews.length ? (
              <>
                <div className={styles.review_bottom_wrapper}>
                  <p className={styles.rating_title}>
                    상품 평균 만족도<span>(481)</span>
                  </p>
                  <div className={styles.rating_wrapper}>
                    <ReviewRating
                      size={isDeskTop ? "2.5em" : "1.5em"}
                      value={2}
                    />
                    <span className={styles.rating_value}>
                      <span>5</span> / 5.0
                    </span>
                  </div>
                </div>
                <div className={styles.reviews_wrapper}>
                  {reviews.map((review, index) => (
                    <div className={styles.detail_review} key={index}>
                      <div className={styles.detail_first_content}>
                        <ReviewRating value={2} />
                        <img
                          src={require(`assets/images/main/main10.jpg`)}
                          alt=""
                        />
                      </div>
                      <div className={styles.detail_second_content}>
                        <div className={styles.detail_review_information}>
                          <p>구매옵션 : skinny 05 mute brown</p>
                          <div className={styles.detail_review_writer}>
                            <span style={{ marginRight: 10 }}>
                              {maskAccountName("username")}
                            </span>
                            <span>{formatDateTime(now())}</span>
                          </div>
                        </div>
                        <p className={styles.written_review}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ut dolore facilis odit assumenda id minima
                          soluta libero aperiam dolorum. Aut a reiciendis
                          officia id maxime illum doloremque dignissimos itaque
                          ducimus!
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <DefaultPagination
                  count={getPageCount(reviews?.length)}
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
            {questions.length ? (
              <>
                <div className={styles.questions_wrapper}>
                  {questions.map((question, index) => (
                    <div className={styles.question_detail_wrap}>
                      <div className={styles.question_detail_content}>
                        <span> {getQuestionStateLabel(question?.state)}</span>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nostrum consequuntur totam, vel perspiciatis
                          consequatur, est aliquid unde quos eius praesentium
                          ipsa voluptatum facilis, quasi quidem excepturi
                          ducimus hic! Ipsam, ducimus.
                        </p>
                      </div>
                      <div className={styles.question_detail_information}>
                        <p>{maskAccountName("username")}</p>
                        <span>{formatDateTime(now())}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <DefaultPagination
                  count={getPageCount(questions?.length)}
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
          {/* <div className={styles.order_info_wrap}></div> */}
          <div className={styles.default_flex}>
            <div className={styles.like_btn_wrap}>
              <LikeHeart
                position={{ position: "relative" }}
                defaultColor="dark"
              />
              <p>234</p>
            </div>
            <DefaultButton label="구매하기" onClick={() => {}} />
          </div>
        </div>
        <DeliveryDrawer visible={deliveryModal} setVisible={setDeliveryModal} />
      </div>
    </MobileLayout>
  );
}
