import React, { useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { Drawer, Rating } from "@mui/material";
import classNames from "classnames";
import { numberWithCommas } from "utilities";

import { ListContent } from "components/common";
import { ImageZoomSlider, ScrollableSlider } from "components/slider";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_detail.module.scss";

export default function ItemDetailContent() {
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

  const [activeTab, setActiveTab] = useState("detail");

  return (
    <div className={styles.item_detail_container}>
      <div className={styles.item_detail_wrapper}>
        <div className={styles.item_content_scroll_wrapper}>
          <ImageZoomSlider images={[...new Array(9)]} />
        </div>
        <div className={styles.item_content_information_wrapper}>
          {/*   <div className={styles.item_header_icon_wrapper}>
            <LikeHeart
              defaultColor="dark"
              position={{ position: "relative" }}
            />
            9.1만
          </div> */}
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
            sapiente voluptatum quasi, eos eaque natus laboriosam perspiciatis?
            Ipsam cupiditate voluptas consequuntur.
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
          <DetailContentWrapper title="COLOR">
            <div className={styles.color_options_wrapper}>
              <p className={styles.selected_option_name}>
                {selectedItemOptions?.color}
              </p>
              <ScrollableSlider>
                {colorOptions.map((option, index) => {
                  const isSelected = selectedItemOptions.color == index;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedItemOptions,
                          color: isSelected ? null : index,
                        });
                      }}
                      className={classNames({
                        [styles.detail_color_options]: true,
                        [styles.selected_color_option]: isSelected,
                      })}
                    >
                      <img
                        src={require("assets/images/sub/sub24.jpg")}
                        className={styles.color_option_thumbnail}
                        style={{
                          height: 90,
                          flex: "0 0 calc(6%)",
                          width: 70,
                        }}
                      />
                    </div>
                  );
                })}
              </ScrollableSlider>
            </div>
          </DetailContentWrapper>
          <DetailContentWrapper title="SIZE">
            <p className={styles.selected_option_name}>
              {selectedItemOptions?.size}
            </p>
            <div className={styles.size_options_wrapper}>
              {sizeOptions.map((size, index) => {
                const isSelected = selectedItemOptions.size == index;
                return (
                  <p
                    onClick={() =>
                      setSelectedOptions({
                        ...selectedItemOptions,
                        size: isSelected ? null : index,
                      })
                    }
                    className={classNames({
                      [styles.size_option]: true,
                      [styles.selected_size_option]: isSelected,
                      [styles.size_option_disabled]: disabled_size == index,
                    })}
                  >
                    {index}
                  </p>
                );
              })}
            </div>
          </DetailContentWrapper>
          <DetailContentWrapper>
            <div className={styles.detail_quantity_wrapper}>
              <div
                className={styles.quantity_button}
                onClick={() => {
                  if (selectedItemOptions.quantity > 1)
                    setSelectedOptions({
                      ...selectedItemOptions,
                      quantity: selectedItemOptions.quantity - 1,
                    });
                }}
              >
                <RemoveIcon />
              </div>
              <input type="number" value={selectedItemOptions?.quantity} />
              <div
                className={styles.quantity_button}
                onClick={() => {
                  setSelectedOptions({
                    ...selectedItemOptions,
                    quantity: selectedItemOptions.quantity + 1,
                  });
                }}
              >
                <AddIcon />
              </div>
            </div>
          </DetailContentWrapper>
          <button className={styles.button_dark_300_color_background_100}>
            주문하기
          </button>
          <button
            className={styles.button_background_100_outline_mb_color_dark_300}
          >
            장바구니
          </button>
        </div>
      </div>
      <div className={styles.tab_menu_container}>
        <div className={styles.tab_menu_wrapper}>
          <div
            onClick={() => setActiveTab("detail")}
            className={styles.tab_menu_wrap}
          >
            Detail
          </div>
          <div onClick={() => setActiveTab("review")}>Review</div>
        </div>
        {activeTab == "detail" && <div>detail</div>}
        {activeTab == "review" && <div>review</div>}
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
            <div className={styles.close_button} onClick={toggleDrawer(false)}>
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
  );
}

function DetailContentWrapper({ children, title = "", border = false }) {
  return (
    <div
      className={styles.detail_content_wrapper}
      style={{ borderBottom: border ? "1px solid #b6b5b5" : "" }}
    >
      {title && <p className={styles.detail_title}>{title}</p>}

      <div className={styles.detail_content_wrap}>{children}</div>
    </div>
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

function TabMenu(name = "", setActiveTab, activeTab) {
  return (
    <div onClick={() => setActiveTab(name)} className={styles.tab_menu_wrap}>
      Detail
    </div>
  );
}
