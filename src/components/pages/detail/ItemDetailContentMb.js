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

import { DeliveryDrawer } from "./DeliveryDrawer";

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
        {/*  */}

        {/*  <div className={styles.item_bottom_navigation}>
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
        </div> */}
        {/*  <div className={styles.item_detail_wrapper}>
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
            <DetailContentWrapper>
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
            <DetailContentWrapper>
              <div className={styles.detail_delivery_wrapper}>
                <div
                  className={styles.detail_delivery_wrap}
                  onClick={() => setToggleDelivery(!toggleDelivery)}
                >
                  <p>
                    무료 <br />
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
          </div>
        </div>
        
         */}
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

function ReviewRating({ size = "1em", value = 0, color = "black" }) {
  return (
    <Rating
      name="half-rating-read"
      defaultValue={value}
      precision={0.5}
      readOnly
      sx={{
        fontSize: size,
        color: color,
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
