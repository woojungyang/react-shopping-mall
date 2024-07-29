import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Drawer } from "@mui/material";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";

import { ListContent } from "components/common";

import styles from "styles/_detail.module.scss";

export default function DeliveryDrawer({ visible, setVisible }) {
  const toggleDrawer = (newOpen) => () => {
    setVisible(newOpen);
  };
  return (
    <Drawer
      anchor="right"
      open={visible}
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
          <Map
            center={{ lat: 37.566295, lng: 126.977945 }}
            style={{ width: "100%", height: "300px" }}
            level={2}
          >
            <CustomOverlayMap position={{ lat: 37.566295, lng: 126.977945 }}>
              <div
                className="overlay"
                style={{
                  backgroundColor: "#FF8C00",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Here!
              </div>
            </CustomOverlayMap>
          </Map>
          <p className={styles.brand_information}>
            브랜드명
            <br /> (04524) 서울특별시 중구 세종대로 110 (태평로1가, 서울시청)
            <br />
            help@example.com
          </p>
        </DrawerContentWrapper>
      </div>
    </Drawer>
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
