import React, { useEffect, useMemo, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import classNames from "classnames";
import { customAlphabet } from "nanoid";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { calculateSum, numberWithCommas } from "utilities";

import useQueryString from "hooks/queryString/useQueryString";

import {
  CommonLayout,
  DefaultButton,
  DefaultCheckbox,
  MobileLayout,
} from "components/common";
import { ColorOptions, QuantityOptions, SizeOptions } from "components/detail";
import { ModalContainer } from "components/modal";

import { checkPhoneNumber } from "utilities/checkExpression";
import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_cart.module.scss";

export default function CartContentMb() {
  const stages = [
    { id: 1, label: "쇼핑백" },
    { id: 2, label: "주문서" },
    { id: 3, label: "주문완료" },
  ];
  const [currentStage, setCurrentStage] = useState(1);

  const [items, setItems] = useState(
    Array.from({ length: 4 }, (v, index) => ({
      id: index,
      checked: true,
      count: index,
      name: "item" + index,
      price: 12344 + index,
      originalPrice: 21233 - index,
    })),
  );

  const [checkedAll, setCheckedAll] = useState(true);

  function toggleAllItemsChecked() {
    setCheckedAll(!checkedAll);
    setItems(
      items.map((e) => {
        return { ...e, checked: !checkedAll };
      }),
    );
  }

  const checkedItems = useMemo(() => items.filter((e) => e.checked), [items]);
  const totalCount = useMemo(
    () => calculateSum(checkedItems.map((e) => e.count)),
    [checkedItems],
  );
  const updateAllItemsCheckedStatus = useMemo(() => {
    if (items.length > 0 && checkedItems.length == items.length)
      setCheckedAll(true);
    else setCheckedAll(false);
  }, [items]);

  const receipt = useMemo(() => {
    const originalPrice = calculateSum(
      checkedItems.map((item) => item.originalPrice),
    );
    const price = calculateSum(checkedItems.map((item) => item.price));

    return {
      originalPrice: originalPrice, //원가
      price: price, //현재판매가
      discountPrice: (originalPrice - price) * -1,
      totalPrice: price,
    };
  }, [items]);

  const [changeOptionsModal, setChangeOptionsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const colorOptions = [...new Array(3)];

  const [orderSheet, setOrderSheet] = useState({});
  function onChange(e) {
    setOrderSheet({ ...orderSheet, [e.target.name]: e.target.value });
  }
  const [sameAsOrderer, setSamAsOrder] = useState(false);
  const autoCompleteOrderSheet = useMemo(() => {
    if (sameAsOrderer)
      setOrderSheet({
        ...orderSheet,
        receiverName: orderSheet?.ordererName,
        receiverPhoneNumber: orderSheet?.ordererPhoneNumber,
      });
    // }
  }, [sameAsOrderer, orderSheet?.ordererName, orderSheet?.ordererPhoneNumber]);

  const [showItemList, setShowItemList] = useState(false);

  const [findAddressModal, setFindAddressModal] = useState(false);
  function completeAddressHandler(data) {
    setFindAddressModal(false);
    setOrderSheet({
      ...orderSheet,
      zipCode: data?.zonecode,
      address: data?.address,
    });
  }

  async function requestPayment() {
    try {
      const numbers = "0123456789";
      const nanoid = customAlphabet(numbers, 10);
      const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

      const tossPayments = await loadTossPayments(clientKey);

      const result = tossPayments
        .requestPayment("카드", {
          amount: receipt?.totalPrice,
          orderId: `${formatDateTime(now(), "yyyyMMdd")}-${nanoid()}`,
          orderName:
            totalCount > 1 ? `상품결제 외 ${totalCount - 1}건` : "상품결제 1건",
          customerName: "홍길동",
          customerEmail: "customer@example.com",
          successUrl: `${window.location.origin}/cart`, // 결제 성공 시 리디렉션할 URL
          failUrl: `${window.location.origin}/cart`, // 결제 실패 시 리디렉션할 URL
        })
        .catch(function (error) {
          // 결제 요청 실패 처리
          if (error.code === "USER_CANCEL") {
            alert("사용자가 결제를 취소하였습니다.");
          } else if (
            error.code === "INVALID_ORDER_NAME" ||
            error.code === "INVALID_ORDER_ID"
          ) {
            alert("유효하지 않은 결제 정보입니다.");
          } else {
            alert("결제 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  const [paymentKey] = useQueryString("paymentKey");
  const [orderId] = useQueryString("orderId");
  useEffect(() => {
    if (!!paymentKey) {
      setCurrentStage(3);
    }
  }, [paymentKey]);
  return (
    <MobileLayout headerTitle="쇼핑백">
      <div className={styles.mobile_cart_container}>
        <div className={styles.mobile_cart_wrapper}>
          <div className={styles.cart_header_wrap}>
            <div className={styles.header_icon_wrap}>
              <DefaultCheckbox
                checked={checkedAll}
                onChange={toggleAllItemsChecked}
              />
              <p>
                선택 상품
                <span className={styles.item_total}>
                  ({checkedItems.length})
                </span>
              </p>
            </div>
            <div
              className={styles.header_icon_wrap}
              onClick={() => {
                setItems(items.filter((e) => !e.checked));
              }}
            >
              <DeleteForeverIcon />
              <p>선택 삭제</p>
            </div>
          </div>
        </div>
        <div className={styles.order_bottom_container}>
          <div className={styles.order_info_wrap}>
            <p>
              총 <strong>{totalCount}</strong>개
            </p>
            <p>
              <strong>{numberWithCommas(receipt?.totalPrice)}</strong> 원
            </p>
          </div>
          <DefaultButton label="주문하기" />
        </div>
      </div>
    </MobileLayout>
  );
}

function ItemsList({
  currentStage = 1,
  items,
  setItems,
  setSelectedItem,
  setChangeOptionsModal,
}) {
  const navigation = useNavigate();
  const isFirstStage = currentStage == 1;
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className={styles.cart_item_wrapper}>
          <div className={styles.cart_item_header}>
            <LocalOfferIcon />
            <p>브랜드명</p>
          </div>
          <div className={styles.cart_item_body}>
            <div className={styles.first_item_content}>
              {isFirstStage && (
                <DefaultCheckbox
                  checked={item.checked}
                  onChange={() => {
                    setItems(
                      items.map((e) => {
                        if (e.id == item.id)
                          return { ...e, checked: !item.checked };
                        else return e;
                      }),
                    );
                  }}
                />
              )}
              <img
                src={require("assets/images/sub/sub17.jpg")}
                alt=""
                onClick={() => navigation(`/items/${item.id}`)}
              />
              <div className={styles.item_option_wrap}>
                <p>상품명</p>
                <div className={styles.item_options}>
                  <p>옵션명</p>
                  {isFirstStage && (
                    <div
                      className={styles.item_option_button}
                      onClick={() => {
                        setSelectedItem(item);
                        setChangeOptionsModal(true);
                      }}
                    >
                      옵션/수량 변경
                      <ExpandMoreIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.second_item_content}>
              <div className={styles.price_wrap}>
                <p className={styles.original_price}>
                  {numberWithCommas(10000)}원
                </p>
                <p className={styles.total_price}>
                  {numberWithCommas(10000)}원
                </p>
              </div>
              {isFirstStage && (
                <div className={styles.buy_button_wrap}>
                  <p className={styles.buy_button}>바로 구매</p>
                  <div
                    className={styles.delete_button}
                    onClick={() => {
                      setItems(items.filter((e) => e.id !== item.id));
                    }}
                  >
                    <DeleteForeverIcon />
                    <p>삭제</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function DeliveryFormWrapper({ title = "", children }) {
  return (
    <div className={styles.delivery_form_container}>
      <p className={styles.form_title}>{title}</p>
      <div className={styles.delivery_form_wrapper}>{children}</div>
    </div>
  );
}

function DeliveryForm({ title = "", children }) {
  return (
    <div className={styles.delivery_form_wrap}>
      <p className={styles.delivery_form_title}>{title}</p>
      <div className={styles.delivery_form_input_wrapper}>{children}</div>
    </div>
  );
}

function DeliveryInput({
  name = "",
  placeholder = "",
  type = "text",
  value,
  onChange,
  disabled = false,
}) {
  return (
    <input
      name={name}
      type={type}
      className={styles.delivery_custom_input}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
