import React, { useState } from "react";

import classNames from "classnames";
import { OrderState, getOrderState } from "models/order";
import { useParams } from "react-router-dom";
import { maskPhoneNumber, numberWithCommas } from "utilities";

import useOrderQuery from "hooks/query/useOrderQuery";

import { DefaultButton, LoadingLayer, MobileLayout } from "components/common";
import { OptionsMobile } from "components/detail";
import { ToastModal } from "components/modal";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function OrderDetailContentMb() {
  const [toastMessage, setToastMessage] = useState("");

  const [optionsChanges, setOptionChanges] = useState({});
  const [changeOptionModal, setChangeOptionModal] = useState(false);

  const { id } = useParams();
  const { data: order, isLoading } = useOrderQuery(id);

  if (isLoading) return <LoadingLayer />;

  return (
    <MobileLayout headerTitle="주문 상세내역" isFooter={false}>
      <div className={styles.mobile_mypage_container}>
        <div className={styles.mobile_mypage_order_detail_wrapper}>
          <div className={styles.order_info}>
            <p>No.{order?.orderNumber}</p>
            <p>{formatDateTime(order?.createdAt, "yyyy.MM.dd HH:mm")}</p>
          </div>
          <div>
            {order?.items.map((item, index) => (
              <OrderItem
                key={index}
                item={item}
                onChangeOption={() => setChangeOptionModal(true)}
                onClickDelivery={() => setToastMessage("준비중입니다.")}
              />
            ))}
          </div>
          <DeliveryWrapper
            title="주문자 정보"
            content={[
              { title: "주문자명", content: order?.orderInformation?.name },
              {
                title: "연락처",
                content: maskPhoneNumber(order?.orderInformation?.phoneNumber),
              },
            ]}
          />
          <DeliveryWrapper
            title="배송지 정보"
            content={[
              {
                title: "받으시는 분",
                content: order?.deliveryInformation?.name,
              },
              {
                title: "연락처",
                content: maskPhoneNumber(
                  order?.deliveryInformation?.phoneNumber,
                ),
              },
              {
                title: "배송지",
                content: `[${order?.deliveryInformation?.zipCode}] ${order?.deliveryInformation?.address}`,
              },
            ]}
          />
          <DeliveryWrapper
            title="최종 결제 정보"
            subTitle={`${numberWithCommas(order?.paymentInformation?.totalPrice)}원`}
          />
          <DeliveryWrapper
            title="결제 수단"
            content={[
              {
                title: "결제 방법",
                content: order?.paymentInformation?.method,
              },
            ]}
          />
        </div>
      </div>
      <ToastModal
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      {changeOptionModal && (
        <OptionsMobile
          isQuantity={false}
          setVisible={setChangeOptionModal}
          optionsChanges={optionsChanges}
          setOptionChanges={setOptionChanges}
          leftButton={{
            label: "취소",
            onClick: () => setChangeOptionModal(false),
          }}
          rightButton={{
            label: "변경 저장",
            onClick: () => {
              setChangeOptionModal(false);
              setToastMessage("변경사항 저장");
            },
          }}
        />
      )}
    </MobileLayout>
  );
}

function OrderItem({ item, setItem, onChangeOption, onClickDelivery }) {
  return (
    <div className={styles.order_item_wrapper}>
      <div className={styles.order_item}>
        <img src={item?.thumbnail} />
        <div className={styles.item_info_wrap}>
          <h5>{getOrderState(item?.state)}</h5>
          <p className={styles.item_name}>{item?.itemName}</p>
          <div className={styles.item_option_wrap}>
            <p>
              {item?.option} | {item?.quantity}개
            </p>
            {item.state < OrderState.Preparing && (
              <p className={styles.option_button} onClick={onChangeOption}>
                옵션변경
              </p>
            )}
          </div>

          <PriceWrap
            isFirst={true}
            price={{ title: "주문금액", price: numberWithCommas(item?.price) }}
          />
          {/*  <PriceWrap
            color="black"
            price={{
              title: "상품금액",
              price: numberWithCommas(),
            }}
          /> */}
          {/*  <PriceWrap
            price={{
              title: "상품할인",
              price: numberWithCommas((originalPrice - price) * -1),
            }}
          /> */}
          <PriceWrap
            price={{
              title: "마일리지",
              price: numberWithCommas((item?.price * 0.02).toFixed(0)),
            }}
          />
        </div>
      </div>
      {item.state >= OrderState.Delivery &&
        item.state < OrderState.PendingExchange && (
          <DefaultButton
            className={styles.button_background_100_outline_color_dark_300}
            label="배송조회"
            onClick={onClickDelivery}
          />
        )}
    </div>
  );
}

function PriceWrap({ price, isFirst = false, color = "" }) {
  return (
    <div
      className={classNames({
        [styles.order_price_wrap]: true,
        [styles.order_price_wrap_first]: isFirst,
      })}
    >
      <p>{price?.title}</p>
      <p style={{ color: color }}>{price?.price}원</p>
    </div>
  );
}

function DeliveryWrapper({ title = "", subTitle = "", content = [] }) {
  return (
    <div className={styles.order_delivery_wrapper}>
      <div className={styles.default_flex_space}>
        <p className={styles.order_delivery_title}>{title}</p>
        {subTitle && <strong>{subTitle}</strong>}
      </div>
      {!!content.length && (
        <div style={{ marginTop: 20 }}>
          {content.map((e) => (
            <DeliveryWrap content={e} />
          ))}
        </div>
      )}
    </div>
  );
}

function DeliveryWrap({ content = {} }) {
  return (
    <div className={styles.order_delivery_wrap}>
      <p style={{ minWidth: 100 }}>{content?.title}</p>
      <p style={{}}>{content?.content}</p>
    </div>
  );
}
