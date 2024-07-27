import React, { useEffect, useMemo, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import classNames from "classnames";
import { customAlphabet } from "nanoid";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { calculateSum, numberWithCommas, scrollTop } from "utilities";

import useQueryString from "hooks/queryString/useQueryString";

import {
  DefaultButton,
  DefaultCheckbox,
  MobileLayout,
} from "components/common";
import { OptionsMobile } from "components/detail";
import { ModalContainer } from "components/modal";

import { checkPhoneNumber } from "utilities/checkExpression";
import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_cart.module.scss";

import DeliveryInput from "./DeliveryInput";

export default function CartContentMb() {
  const navigation = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);

  const [items, setItems] = useState(
    Array.from({ length: 4 }, (v, index) => ({
      id: index,
      checked: true,
      quantity: index,
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
    () => calculateSum(checkedItems.map((e) => e.quantity)),
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
    const totalPrice = calculateSum(
      checkedItems.map((item) => item.price * item.quantity),
    );
    const originalTotalPrice = calculateSum(
      checkedItems.map((item) => item.originalPrice * item.quantity),
    );

    return {
      originalPrice: originalPrice, //원가
      price: price, //현재판매가
      discountPrice: (originalTotalPrice - totalPrice) * -1,
      totalPrice: totalPrice,
      originalTotalPrice: originalTotalPrice,
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

  const [optionsChanges, setOptionChanges] = useState({});

  useEffect(() => {
    if (changeOptionsModal) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [changeOptionsModal]);
  return (
    <MobileLayout headerTitle={currentStage == 1 ? "쇼핑백" : "주문/결제"}>
      <div
        className={styles.mobile_cart_container}
        style={
          currentStage == 3
            ? { backgroundColor: "white", paddingBottom: 0 }
            : {}
        }
      >
        {currentStage == 1 && (
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
                <p>선택 삭제</p>
              </div>
            </div>
            <ItemsList
              currentStage={currentStage}
              items={items}
              setItems={setItems}
              setChangeOptionsModal={setChangeOptionsModal}
              setSelectedItem={setSelectedItem}
              directPayment={() => {
                scrollTop();
                setCurrentStage(currentStage + 1);
              }}
            />
          </div>
        )}
        {currentStage == 2 && (
          <div>
            <DeliveryFormWrapper title="주문고객">
              <DeliveryInput
                value={orderSheet?.ordererName}
                onChange={onChange}
                name="ordererName"
                placeholder="이름을 입력해주세요."
              />

              <DeliveryInput
                type="number"
                value={orderSheet?.ordererPhoneNumber}
                onChange={onChange}
                name="ordererPhoneNumber"
                placeholder="연락처를 입력해주세요."
              />
            </DeliveryFormWrapper>
            <DeliveryFormWrapper title="배송지 정보">
              <div className={styles.delivery_check_box}>
                <DefaultCheckbox
                  checked={sameAsOrderer}
                  onChange={() => {
                    if (
                      !orderSheet?.ordererName ||
                      !orderSheet?.ordererPhoneNumber
                    )
                      alert("주문 고객 정보를 먼저 기입해주세요.");
                    else setSamAsOrder(!sameAsOrderer);
                  }}
                />
                <span>주문자와 동일</span>
              </div>

              <DeliveryInput
                disabled={sameAsOrderer}
                value={orderSheet?.receiverName}
                onChange={onChange}
                name="receiverName"
                placeholder="이름을 입력해주세요."
              />

              <DeliveryInput
                disabled={sameAsOrderer}
                type="number"
                value={orderSheet?.receiverPhoneNumber}
                onChange={onChange}
                name="receiverPhoneNumber"
                placeholder="연락처를 입력해주세요."
              />

              <div className={styles.zipcode_flex_box}>
                <DeliveryInput disabled value={orderSheet?.zipCode} />
                <button
                  className={styles.zipcode_button}
                  onClick={() => setFindAddressModal(true)}
                >
                  우편번호 검색
                </button>
              </div>

              <DeliveryInput
                disabled={true}
                value={orderSheet?.address}
                onChange={onChange}
                name="address"
              />
              <DeliveryInput
                value={orderSheet?.addressDetail}
                onChange={onChange}
                name="addressDetail"
                placeholder="상세주소"
              />

              <DeliveryInput
                value={orderSheet?.memo}
                onChange={onChange}
                name="memo"
                placeholder="메세지를 작성해주세요"
              />
            </DeliveryFormWrapper>
            <DeliveryFormWrapper title="주문상품">
              <ItemsList
                currentStage={currentStage}
                items={items}
                setItems={setItems}
                setChangeOptionsModal={setChangeOptionsModal}
                setSelectedItem={setSelectedItem}
              />
            </DeliveryFormWrapper>
          </div>
        )}
        <div
          className={classNames({
            [styles.delivery_form_container_mb]: currentStage == 2,
          })}
        >
          {currentStage == 2 && (
            <p className={styles.form_title}>최종 결제 정보</p>
          )}
          {currentStage < 3 && (
            <>
              <div className={styles.receipt_detail_wrap}>
                <div className={styles.default_flex_space}>
                  <p className={styles.receipt_title}>상품 금액</p>
                  <p>
                    <strong>
                      {numberWithCommas(receipt?.originalTotalPrice)}
                    </strong>
                    원
                  </p>
                </div>
                <div className={styles.default_flex_space}>
                  <p className={styles.receipt_title}>할인금액</p>
                  <p>
                    <strong>{numberWithCommas(receipt?.discountPrice)}</strong>
                    원
                  </p>
                </div>
              </div>
              <div className={styles.total_price_wrap}>
                <p>최종 결제 금액</p>
                <p className={styles.price}>
                  <strong> {numberWithCommas(receipt?.totalPrice)}</strong>
                  <span>원</span>
                </p>
              </div>
            </>
          )}
        </div>
        {currentStage == 2 && (
          <DeliveryFormWrapper>
            <p className={styles.payment_guid}>
              <div>
                <DefaultCheckbox />
                <span style={{ marginLeft: 3 }}>
                  {" "}
                  주문 내용을 확인했고, 약관에 동의합니다
                </span>
              </div>
              <ChevronRightIcon />
            </p>
          </DeliveryFormWrapper>
        )}
        {currentStage < 3 && (
          <div className={styles.order_bottom_container}>
            <div className={styles.order_info_wrap}>
              <p>
                총 <strong>{totalCount}</strong>개
              </p>
              <p>
                <strong>{numberWithCommas(receipt?.totalPrice)}</strong> 원
              </p>
            </div>
            <DefaultButton
              label={currentStage == 1 ? "주문하기" : "결제하기"}
              onClick={() => {
                scrollTop();
                if (!checkedItems.length)
                  alert("구매하실 상품을 먼저 선택해주세요.");
                else if (currentStage == 1) setCurrentStage(currentStage + 1);
                else {
                  requestPayment();
                  // if (
                  //   !orderSheet?.ordererName ||
                  //   !orderSheet?.ordererPhoneNumber ||
                  //   !checkPhoneNumber(orderSheet?.ordererPhoneNumber) ||
                  //   !orderSheet?.receiverName ||
                  //   !orderSheet?.receiverPhoneNumber ||
                  //   !checkPhoneNumber(orderSheet?.receiverPhoneNumber) ||
                  //   !orderSheet?.zipCode
                  // )
                  //   alert("주문서를 확인해주세요");
                  // else requestPayment();
                }
              }}
            />
          </div>
        )}
        {currentStage == 3 && (
          <div className={styles.success_order_container}>
            <h3>주문이 완료되었습니다.</h3>
            <p className={styles.description}>
              {formatDateTime(now())} 주문하신 상품의 <br />
              주문번호는 <span>{orderId}</span>입니다
            </p>

            <div style={{ padding: "20px 16px", width: "100%" }}>
              <ItemsList items={checkedItems} currentStage={currentStage} />
            </div>
            <DefaultButton
              label="홈으로 돌아가기"
              onClick={() => navigation("/", { replace: true })}
            />
          </div>
        )}
      </div>

      {changeOptionsModal && (
        <OptionsMobile
          setVisible={setChangeOptionsModal}
          optionsChanges={optionsChanges}
          setOptionChanges={setOptionChanges}
          leftButton={{
            label: "취소",
            onClick: () => setChangeOptionsModal(false),
          }}
          rightButton={{
            label: "변경 저장",
            onClick: () => {
              setChangeOptionsModal(false);
              setItems(
                items.map((item) => {
                  if (item.id == selectedItem.id) {
                    return {
                      ...item,
                      quantity: optionsChanges.quantity,
                      option: optionsChanges?.option,
                    };
                  } else {
                    return item;
                  }
                }),
              );
            },
          }}
        />
      )}
      {findAddressModal && (
        <ModalContainer
          title="우편번호 찾기"
          visible={findAddressModal}
          setVisible={setFindAddressModal}
        >
          <DaumPostcode
            style={{
              width: "200px",
            }}
            onComplete={completeAddressHandler}
          />
        </ModalContainer>
      )}
    </MobileLayout>
  );
}

function ItemsList({
  currentStage = 1,
  items,
  setItems,
  setSelectedItem,
  setChangeOptionsModal,
  directPayment,
}) {
  const navigation = useNavigate();
  const isFirstStage = currentStage == 1;
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className={styles.cart_item_wrapper_mb}>
          <div className={styles.item_content_wrap}>
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
              className={styles.item_thumbnail}
              src={require("assets/images/sub/sub17.jpg")}
              alt=""
              onClick={() => navigation(`/items/${item.id}`)}
            />
            <div className={styles.cart_item_information}>
              <div>
                <p className={styles.brand_name}>브랜드명</p>
                <p>상품명</p>
                <p>옵션명</p>
                <p>수량 : {item?.quantity}</p>
              </div>
              <div className={styles.price_info}>
                {isFirstStage ? (
                  <DeleteForeverIcon
                    onClick={() => {
                      setItems(items.filter((e) => e.id !== item.id));
                    }}
                  />
                ) : (
                  <div></div>
                )}
                <div>
                  <p className={styles.original_price}>
                    {numberWithCommas(item.originalPrice)}원
                  </p>
                  <p className={styles.price}>
                    {numberWithCommas(item.price)}원
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isFirstStage && (
            <div className={styles.item_button_wrap}>
              <DefaultButton
                onClick={() => {
                  setSelectedItem(item);
                  setChangeOptionsModal(true);
                }}
                label="옵션/수량 변경"
                className={styles.button_background_100_outline_color_dark_300}
              />
              <DefaultButton
                label="바로구매"
                onClick={() => {
                  setItems([{ ...item, checked: true }]);
                  directPayment();
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

function DeliveryFormWrapper({ title = "", children }) {
  return (
    <div className={styles.delivery_form_container_mb}>
      <p className={styles.form_title}>{title}</p>
      <div className={styles.delivery_form_wrapper}>{children}</div>
    </div>
  );
}
