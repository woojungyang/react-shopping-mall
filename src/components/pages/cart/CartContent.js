import React, { useEffect, useMemo, useRef, useState } from "react";

import { addItem, removeItem } from "app/counterSlice";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import classNames from "classnames";
import { userToken } from "models/user";
import { customAlphabet } from "nanoid";
import DaumPostcode from "react-daum-postcode";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateSum, numberWithCommas, scrollTop } from "utilities";

import useCartItemMutation from "hooks/mutation/useCartItemMutation";
import useCartItemsMutation from "hooks/mutation/useCartItemsMutation";
import useItemQuery from "hooks/query/useItemQuery";

import {
  DefaultButton,
  DefaultCheckbox,
  LoadingLayer,
} from "components/common";
import {
  ChangeOptionModal,
  ModalContainer,
  ToastModal,
} from "components/modal";

import { checkPhoneNumber } from "utilities/checkExpression";
import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_cart.module.scss";

import DeliveryInput from "./DeliveryInput";

export default function CartContent() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const directPayment = JSON.parse(localStorage.getItem("direct")) ?? null;

  const stages = [
    { id: 1, label: "쇼핑백" },
    { id: 2, label: "주문서" },
    { id: 3, label: "주문완료" },
  ];
  const [paymentStage, setPaymentStage] = useState(1);

  const [toastMessage, setToastMessage] = useState("");

  const [items, setItems] = useState([
    ...useSelector((state) => state.counter.items),
  ]);
  const [carItems, setCartItems] = useState([]);

  const [changeOptionsModal, setChangeOptionsModal] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    if (directPayment?.id) {
      setItems([{ ...directPayment }]);
      setPaymentStage(2);
    }
    return () => {
      localStorage.removeItem("direct");
    };
  }, []);

  const itemQuery = useItemQuery(
    items[0]?.id || selectedItem?.id,
    { optionId: items[0]?.optionsId },
    {
      enabled: !!items.length || !!selectedItem?.id,
      onSuccess: (data) => {
        if (items.length) {
          setCartItems([
            ...carItems,
            {
              ...data,
              quantity: items[0].quantity,
              checked: data.option.inventory > 0,
            },
          ]);
          const newArray = items.slice(1);
          setItems(newArray);

          if (!!newArray.length)
            queryClient.invalidateQueries([
              `/api/v1/item/${items[0]?.id}`,
              { optionId: items[0]?.optionsId },
            ]);
        }
        if (!!selectedItem?.id) {
          setItemInfo(data);
          setChangeOptionsModal(true);
        }
      },
      onError: (error) => {
        setToastMessage(error.message);
      },
    },
  );

  const [checkedAll, setCheckedAll] = useState(true);

  function toggleAllItemsChecked() {
    setCheckedAll(!checkedAll);
    setCartItems(
      carItems.map((e) => {
        return { ...e, checked: e.option.inventory > 0 ? !checkedAll : false };
      }),
    );
  }

  const checkedItems = useMemo(
    () => carItems.filter((e) => e.checked),
    [carItems],
  );

  const updateCartItemOptionsMutation = useCartItemMutation(itemInfo?.id);

  async function requestUpdateItemOptions() {
    try {
      const selectedItemForChangeOptions = carItems.find(
        (e) => e.id == selectedItem.id,
      );
      const findOption = itemInfo?.options?.find(
        (e) => e.color == selectedItem.color && e.size == selectedItem.size,
      );

      const newOptions = {
        id: itemInfo.id.toString(),
        optionsId: findOption?.id ?? selectedItemForChangeOptions?.option.id,
        quantity:
          selectedItem?.quantity ?? selectedItemForChangeOptions?.quantity,
      };
      dispatch(removeItem(itemInfo.id));
      dispatch(addItem(newOptions));
      if (!!userToken)
        await updateCartItemOptionsMutation.mutateAsync(newOptions);
      setCartItems(
        carItems.map((e) =>
          e.id == itemInfo.id
            ? {
                ...e,
                option: findOption ?? selectedItemForChangeOptions.option,
                quantity: newOptions.quantity,
              }
            : e,
        ),
      );
      setSelectedItem({});
    } catch (error) {
      setToastMessage(error.message);
    }
  }

  const deleteCartItemsMutation = useCartItemsMutation("delete");
  async function requestDeleteCartItems(items = []) {
    try {
      items.forEach((item) =>
        dispatch(removeItem({ id: item.id, optionsId: item.option.id })),
      );
      setCartItems(
        carItems.filter(
          (item) =>
            !items.some(
              (i) => i.id === item.id && i.option.id === item.option.id,
            ),
        ),
      );

      if (userToken)
        await deleteCartItemsMutation.mutateAsync({
          ids: items.map((e) => e.id),
        });
    } catch (error) {
      setToastMessage(error.message);
    }
  }

  const totalCount = useMemo(
    () => calculateSum(checkedItems.map((e) => e.quantity)),
    [checkedItems],
  );
  const updateAllItemsCheckedStatus = useMemo(() => {
    if (carItems.length > 0 && checkedItems.length == carItems.length)
      setCheckedAll(true);
    else setCheckedAll(false);
  }, [carItems]);

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
  }, [carItems]);

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

  const container = useRef(null);

  async function requestPayment() {
    try {
      const numbers = "0123456789";
      const nanoid = customAlphabet(numbers, 10);
      const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

      const tossPayments = await loadTossPayments(clientKey);

      const itemIds = checkedItems
        .map((e) => `${e.id}-${e.option.id}`)
        .join(",");

      const result = tossPayments
        .requestPayment("카드", {
          amount: receipt?.totalPrice,
          orderId: `${formatDateTime(now(), "yyyyMMdd")}-${nanoid()}`,
          orderName:
            totalCount > 1 ? `상품결제 외 ${totalCount - 1}건` : "상품결제 1건",
          customerName: "홍길동",
          customerEmail: "customer@example.com",
          successUrl: `${window.location.origin}/payment?itemIds=${itemIds}`, // 결제 성공 시 리디렉션할 URL
          failUrl: `${window.location.origin}/payment`, // 결제 실패 시 리디렉션할 URL
        })
        .catch(function (error) {
          // 결제 요청 실패 처리
          if (error.code === "USER_CANCEL") {
            setToastMessage("사용자가 결제를 취소하였습니다.");
          } else if (
            error.code === "INVALID_ORDER_NAME" ||
            error.code === "INVALID_ORDER_ID"
          ) {
            setToastMessage("유효하지 않은 결제 정보입니다.");
          } else {
            setToastMessage(
              "결제 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            );
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  if (
    itemQuery.isLoading ||
    itemQuery.isFetching ||
    updateCartItemOptionsMutation.isLoading ||
    deleteCartItemsMutation.isLoading
  )
    return <LoadingLayer />;

  return (
    <>
      <div className={styles.cart_container}>
        <h1 className={styles.cart_title}>쇼핑백</h1>
        <div className={styles.stage_wrap}>
          {stages.map((stage, index) => (
            <p
              key={index}
              className={classNames({
                [styles.current_stage]: paymentStage == stage.id,
                [styles.stage]: true,
              })}
            >
              {stage.label}{" "}
              {index + 1 !== stages.length && <ChevronRightIcon />}
            </p>
          ))}
        </div>
        <div className={styles.cart_content_wrapper} ref={container}>
          <div
            className={styles.cart_items_list}
            style={paymentStage == 3 ? { width: "100%", margin: "auto" } : {}}
          >
            {paymentStage == 1 && (
              <div style={{ width: "100%" }}>
                <p className={styles.cart_subtitle}>상품정보</p>
                <div className={styles.cart_header_wrap}>
                  <div className={styles.header_icon_wrap}>
                    <DefaultCheckbox
                      checked={checkedAll}
                      onChange={toggleAllItemsChecked}
                    />
                    <p>
                      선택 상품
                      <span className={styles.item_total}>
                        {checkedItems.length}
                      </span>
                    </p>
                  </div>
                  <div
                    className={styles.header_icon_wrap}
                    onClick={() => requestDeleteCartItems(checkedItems)}
                  >
                    <DeleteForeverIcon />
                    <p>선택 삭제</p>
                  </div>
                </div>

                {carItems.length > 0 ? (
                  <ItemsList
                    currentStage={paymentStage}
                    items={carItems}
                    setItems={setCartItems}
                    setChangeOptionsModal={setChangeOptionsModal}
                    setSelectedItem={setSelectedItem}
                    directPayment={(item) => {
                      if (token) {
                        scrollTop();
                        setCartItems([{ ...item, checked: true }]);
                        setPaymentStage(Number(paymentStage) + 1);
                      } else {
                        setToastMessage("로그인이 필요한 기능입니다.");
                        setTimeout(() => {
                          navigation("/login");
                        }, [3000]);
                      }
                    }}
                    deleteItem={requestDeleteCartItems}
                  />
                ) : (
                  <p className={styles.empty_cart}>
                    쇼핑백에 담긴 상품이 없습니다.
                  </p>
                )}
              </div>
            )}
            {paymentStage == 2 && (
              <>
                <DeliveryFormWrapper title="주문고객">
                  <DeliveryForm title="이름">
                    <DeliveryInput
                      value={orderSheet?.ordererName}
                      onChange={onChange}
                      name="ordererName"
                    />
                  </DeliveryForm>
                  <DeliveryForm title="휴대폰 번호">
                    <DeliveryInput
                      type="number"
                      value={orderSheet?.ordererPhoneNumber}
                      onChange={onChange}
                      name="ordererPhoneNumber"
                    />
                  </DeliveryForm>
                </DeliveryFormWrapper>
                <DeliveryFormWrapper title="배송지 정보">
                  <DeliveryForm title="배송지 선택">
                    <div className={styles.delivery_flex_box}>
                      <DefaultCheckbox
                        checked={sameAsOrderer}
                        onChange={() => {
                          if (
                            !orderSheet?.ordererName ||
                            !orderSheet?.ordererPhoneNumber
                          )
                            setToastMessage(
                              "주문 고객 정보를 먼저 기입해주세요.",
                            );
                          else setSamAsOrder(!sameAsOrderer);
                        }}
                      />
                      <span>주문자와 동일</span>
                    </div>
                  </DeliveryForm>
                  <DeliveryForm title="받으시는 분">
                    <DeliveryInput
                      disabled={sameAsOrderer}
                      value={orderSheet?.receiverName}
                      onChange={onChange}
                      name="receiverName"
                    />
                  </DeliveryForm>
                  <DeliveryForm title="휴대폰 번호">
                    <DeliveryInput
                      disabled={sameAsOrderer}
                      type="number"
                      value={orderSheet?.receiverPhoneNumber}
                      onChange={onChange}
                      name="receiverPhoneNumber"
                    />
                  </DeliveryForm>
                  <DeliveryForm title="배송 주소">
                    <div className={styles.delivery_flex_box}>
                      <input
                        type="text"
                        disabled
                        value={orderSheet?.zipCode}
                        className={styles.delivery_custom_input}
                        style={{ width: "40%" }}
                      />
                      <button
                        className={styles.zipcode_button}
                        onClick={() => setFindAddressModal(true)}
                      >
                        우편번호 찾기
                      </button>
                    </div>
                    <div className={styles.delivery_address_wrapper}>
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
                    </div>
                  </DeliveryForm>
                  <DeliveryForm title="배송 메세지">
                    <DeliveryInput
                      value={orderSheet?.memo}
                      onChange={onChange}
                      name="memo"
                      placeholder="메세지를 작성해주세요"
                    />
                  </DeliveryForm>
                </DeliveryFormWrapper>
                <DeliveryFormWrapper title="주문상품">
                  <div
                    className={styles.toggle_order_item_list}
                    onClick={() => setShowItemList(!showItemList)}
                  >
                    <p>상품정보</p>
                    <p className={styles.item_total_information}>
                      {totalCount}건 | {numberWithCommas(receipt?.totalPrice)}원
                      {showItemList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </p>
                  </div>
                  {showItemList && (
                    <div style={{ padding: "20px 0px" }}>
                      <ItemsList
                        items={checkedItems}
                        currentStage={paymentStage}
                      />
                    </div>
                  )}
                </DeliveryFormWrapper>
              </>
            )}
          </div>
          <div className={styles.payment_information_wrapper}>
            <div className={styles.payment_information_wrap}>
              <p className={styles.payment_title}>결제정보</p>
              <div className={styles.receipt_wrap}>
                <div className={styles.default_flex_space}>
                  <p className={styles.receipt_title}>주문금액</p>
                  <p>
                    <strong>{numberWithCommas(receipt?.originalPrice)}</strong>{" "}
                    원
                  </p>
                </div>
                <div className={styles.receipt_detail_wrap}>
                  <div className={styles.default_flex_space}>
                    <p className={styles.receipt_title}>상품 금액</p>
                    <p>{numberWithCommas(receipt?.originalTotalPrice)}원</p>
                  </div>
                  <div className={styles.default_flex_space}>
                    <p className={styles.receipt_title}>할인금액</p>
                    <p>{numberWithCommas(receipt?.discountPrice)}원</p>
                  </div>
                </div>
              </div>
              <div className={styles.total_price_wrap}>
                <p>최종 결제 금액</p>
                <p className={styles.price}>
                  {numberWithCommas(receipt?.totalPrice)}
                  <span>원</span>
                </p>
              </div>
              <p className={styles.payment_guid}>
                주문 내용을 확인했고, 약관에 동의합니다 <ChevronRightIcon />
              </p>
              <DefaultButton
                className={styles.button_dark_300_color_background_100}
                label="결제하기"
                onClick={() => {
                  scrollTop();

                  if (token) {
                    if (!checkedItems.length)
                      setToastMessage("구매하실 상품을 먼저 선택해주세요.");
                    else if (paymentStage == 1)
                      setPaymentStage(paymentStage + 1);
                    // else
                    else {
                      if (
                        !orderSheet?.ordererName ||
                        !orderSheet?.ordererPhoneNumber ||
                        !checkPhoneNumber(orderSheet?.ordererPhoneNumber) ||
                        !orderSheet?.receiverName ||
                        !orderSheet?.receiverPhoneNumber ||
                        !checkPhoneNumber(orderSheet?.receiverPhoneNumber) ||
                        !orderSheet?.zipCode
                      )
                        setToastMessage("주문서를 확인해주세요");
                      else requestPayment();
                    }
                  } else {
                    setToastMessage("로그인이 필요한 기능입니다.");
                    setTimeout(() => {
                      navigation("/login");
                    }, [3000]);
                  }
                }}
              />
            </div>
          </div>
          {/*  

         */}
        </div>
      </div>
      {changeOptionsModal && (
        <ChangeOptionModal
          item={itemInfo}
          visible={changeOptionsModal}
          setVisible={setChangeOptionsModal}
          selectedItemOptions={selectedItem}
          setSelectedItemOptions={setSelectedItem}
          onSubmit={requestUpdateItemOptions}
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
              width: "400px",
            }}
            onComplete={completeAddressHandler}
          />
        </ModalContainer>
      )}
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </>
  );
}

function ItemsList({
  currentStage = 1,
  items,
  setItems,
  setSelectedItem,
  directPayment,
  deleteItem,
}) {
  const navigation = useNavigate();
  const isFirstStage = currentStage == 1;

  return (
    <>
      {items.map((item, index) => {
        const isSoldOut = item?.option?.inventory < 1;
        return (
          <div key={index} className={styles.cart_item_wrapper}>
            <div className={styles.cart_item_header}>
              <LocalOfferIcon />
              <p>{item?.brand?.name}</p>
            </div>
            <div className={styles.cart_item_body}>
              <div className={styles.first_item_content}>
                {isFirstStage && (
                  <DefaultCheckbox
                    checked={item.checked}
                    disabled={isSoldOut}
                    onChange={() => {
                      setItems(
                        items.map((e) =>
                          e.id == item.id && e.option.id == item.option.id
                            ? { ...e, checked: !item.checked }
                            : e,
                        ),
                      );
                    }}
                  />
                )}
                <img
                  src={item?.thumbnail}
                  alt=""
                  onClick={() => navigation(`/items/${item.id}`)}
                  className={classNames({
                    [styles.sold_out_img]: isSoldOut,
                  })}
                />
                <div className={styles.item_option_wrap}>
                  <p>{item?.itemName}</p>
                  <div className={styles.item_options}>
                    <p>
                      {item?.option?.color} | {item?.option?.size} |{" "}
                      {item?.quantity}개
                    </p>
                    {isFirstStage && !isSoldOut && (
                      <div
                        className={styles.item_option_button}
                        onClick={() => {
                          setSelectedItem({ id: item.id });
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
                    {numberWithCommas(item?.originalPrice)}원
                  </p>
                  <p className={styles.total_price}>
                    {numberWithCommas(item?.price * item?.quantity)}원
                  </p>
                </div>
                {isFirstStage && (
                  <div className={styles.buy_button_wrap}>
                    {isSoldOut ? (
                      <p className={styles.sold_out_button}>품절</p>
                    ) : (
                      <p
                        className={styles.buy_button}
                        onClick={() => directPayment(item)}
                      >
                        바로 구매
                      </p>
                    )}
                    <div
                      className={styles.delete_button}
                      onClick={() => deleteItem([item])}
                    >
                      <DeleteForeverIcon />
                      <p>삭제</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
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
