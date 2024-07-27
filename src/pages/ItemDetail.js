import React, { useEffect, useMemo, useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import { DefaultPagination, ListContent } from "components/common";
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

export default function ItemDetail() {
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
    <CommonLayout>
      <div className={styles.item_detail_container}>
        <div className={styles.item_bottom_navigation}>
          {!isDeskTop && (
            <div className={styles.navigation_button}>
              <LikeHeart defaultColor="dark" position={{ top: "3%" }} />
            </div>
          )}
          <div className={styles.navigation_button}>
            <ShareIcon style={{ width: "1em", height: "1em" }} />
          </div>
          <div className={styles.navigation_button} onClick={scrollTop}>
            <KeyboardArrowUpIcon />
          </div>
          <div className={styles.navigation_button}>
            <KeyboardArrowDownIcon
              onClick={() =>
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth",
                })
              }
            />
          </div>
        </div>
        <div className={styles.item_detail_wrapper}>
          <div className={styles.item_content_scroll_wrapper}>
            <ImageZoomSlider images={[...new Array(9)]} />
          </div>
          <div className={styles.item_content_information_wrapper}>
            {isDeskTop && (
              <div className={styles.item_header_icon_wrapper}>
                <LikeHeart
                  defaultColor="dark"
                  position={{ position: "relative" }}
                />
                9.1만
              </div>
            )}
            <div className={styles.item_header_wrapper}>
              <span className={styles.item_brand_name}>
                brandName | WXWP30644-BKS{" "}
              </span>
              <h1 className={styles.item_name}>자가드 포켓 우븐 팬츠</h1>
            </div>
            <div className={styles.price_information_wrapper}>
              <span className={styles.total_price}>
                {numberWithCommas(149000)}원
              </span>
              <p>
                <span className={styles.original_price}>
                  {numberWithCommas(149000)}원
                </span>
                <span className={styles.sale_percent}>20%</span>
              </p>
            </div>
            <p className={styles.item_description}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              facilis libero magni temporibus alias, sit nobis et eligendi,
              sapiente voluptatum quasi, eos eaque natus laboriosam
              perspiciatis? Ipsam cupiditate voluptas consequuntur.
            </p>
            <DetailContentWrapper border={true}>
              <div className={styles.detail_delivery_wrapper}>
                <div
                  className={styles.detail_delivery_wrap}
                  onClick={() => setToggleDelivery(!toggleDelivery)}
                >
                  <p>
                    {numberWithCommas(30000)}원 이상 구매시 무료 (도서산간 추가{" "}
                    {numberWithCommas(3000)}) <br />
                    <span className={styles.delivery_description}>
                      <span className={styles.delivery_}>{today} 도착예정</span>{" "}
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
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />

                  <p>4.0</p>
                </div>
                <p className={styles.review_flag_button}>
                  {numberWithCommas(1)} 리뷰 보기
                </p>
              </div>
            </DetailContentWrapper>
            <ColorOptions
              selectedItemOptions={selectedItemOptions}
              setSelectedOptions={setSelectedOptions}
              colorOptions={colorOptions}
            />
            <SizeOptions
              selectedItemOptions={selectedItemOptions}
              setSelectedOptions={setSelectedOptions}
              sizeOptions={sizeOptions}
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
            />
          </div>
        </div>
        <div className={styles.recommend_container}>
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
        <div className={styles.tab_menu_container}>
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
            className={styles.recommend_container}
            style={{
              marginBottom: isDeskTop ? 150 : 50,
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
                      height: isDeskTop ? 300 : 200,
                      minWidth: isDeskTop ? 100 : 200,
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
        <Drawer
          anchor="right"
          open={deliveryModal}
          onClose={toggleDrawer(false)}
          sx={{ zIndex: 100000 }}
        >
          <div className={styles.drawer_container}>
            <div className={styles.drawer_header}>
              <p>배송/교환/반품/AS 관련 유의사항</p>
              <div
                className={styles.close_button}
                onClick={toggleDrawer(false)}
              >
                <CloseIcon />
              </div>
            </div>
            <DrawerContentWrapper title="주문 및 배송">
              <ListContent
                content="제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공,
                도선료)가 부과 될 수 있습니다 ( 제주 : 3,000원 / 도서산간 :
                3,000원)"
              />
              <ListContent
                content="장기간 장바구니에 보관하신 상품은 시간이 지남에 따라 가격과 혜택이
                변동 될 수 있으며, 최대 30일 동안 보관됩니다."
              />
            </DrawerContentWrapper>
            <DrawerContentWrapper title="배송 전 취소">
              <ListContent content="입금전 주문취소는 마이페이지에서 직접 가능합니다." />
              <ListContent
                content="장기간 장바구니에 보관하신 상품은 시간이 지남에 따라 가격과 혜택이
                변동 될 수 있습니다."
              />
              <ListContent content="배송전인 상품은 Q&A 게시판, 혹은 이메일로 주문취소 접수가 가능합니다." />
              <ListContent content="주문취소 및 환불은 이메일 혹은 고객센터를 통해 접수가 가능합니다." />
              <ListContent
                content="받아보신 상품의 사이즈가 맞지 않거나 제품 하자, 단순 변심 등의
                사유 발생 시 교환 및 반품 신청이 가능합니다."
              />
            </DrawerContentWrapper>
            <DrawerContentWrapper title="교환 및 환불">
              <ListContent content="교환 및 환불 접수는 상품 수령일로부터 7일 이내에만 가능합니다." />
              <ListContent content="상품하자 이외 사이즈, 색상교환 등 단순 변심에 의한 교환/반품 택배비 고객부담으로 왕복택배비가 발생합니다. (전자상거래 등에서의 소비자보호에 관한 법률 제18조(청약 철회등)9항에 의거 소비자의 사정에 의한 청약 철회 시 택배비는 소비자 부담입니다.)" />
              <ListContent content="교환 및 반품시 훼손이나 파손될 우려가 있는 상품은 재포장에 유의하여 반송해 주시기 바랍니다." />
              <ListContent content="배송시 제품과 함께 들어있던 패키지와 라벨, 사은품은 함께 반송해 주시기 바랍니다." />
              <ListContent content="상품불량 또는 파손에 의한 왕복 배송비는 하이츠에서 부담합니다." />
              <ListContent content="제품이 반송된 후 당사에서 회수처리가 완료된 후 교환 및 환불처리가 진행 됩니다." />
            </DrawerContentWrapper>
            <DrawerContentWrapper title="교환 및 반품 주소">
              <p className={styles.brand_information}>
                하이츠스토어
                <br /> (04043) 서울시 마포구 양화로12길 16-8 2층
                <br />
                help@heights-store.com
              </p>
            </DrawerContentWrapper>
          </div>
        </Drawer>
      </div>
    </CommonLayout>
  );
}

function DrawerContentWrapper({ children, title }) {
  return (
    <div className={styles.drawer_content}>
      <p className={styles.drawer_title}>{title}</p>
      {children}
    </div>
  );
}

function TabsWrapper({ activeTab, scrollToElement }) {
  const tabMenus = [
    { label: "detail" },
    { label: "review", count: 0 },
    { label: "q&a", count: 1 },
  ];

  return (
    <div className={styles.tab_menu_wrapper}>
      {tabMenus.map((tab, index) => (
        <div
          onClick={() => scrollToElement(tab.label)}
          key={index}
          className={classNames({
            [styles.tab_menu_wrap]: true,
            [styles.tab_menu_wrap_active]: activeTab == tab.label,
          })}
        >
          <p>
            {tab.label.toUpperCase()}
            {!!tab.count ? `(${tab.count})` : ""}{" "}
          </p>
        </div>
      ))}
    </div>
  );
}

function ReviewRating({ size = "1em", value = 0 }) {
  return (
    <Rating
      name="half-rating-read"
      defaultValue={value}
      precision={0.5}
      readOnly
      sx={{
        fontSize: size,
        color: "black",
      }}
    />
  );
}

function EmptyList({ comment = "" }) {
  return (
    <div className={styles.empty_list_wrapper}>
      <div className={styles.empty_review_wrap}>
        <p>{comment}</p>
      </div>
    </div>
  );
}
