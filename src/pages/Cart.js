import React, { useMemo, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import classNames from "classnames";
import { calculateSum, numberWithCommas } from "utilities";

import {
  CommonLayout,
  DefaultButton,
  DefaultCheckbox,
} from "components/common";

import styles from "styles/_cart.module.scss";

export default function Cart() {
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
  const updateAllItemsCheckedStatus = useMemo(() => {
    if (checkedItems.length == items.length) setCheckedAll(true);
    else setCheckedAll(false);
  }, [items]);

  const receipt = useMemo(() => {
    const originalPrice = calculateSum(
      checkedItems.map((item) => item.originalPrice),
    );
    const price = calculateSum(checkedItems.map((item) => item.price));
    const deliveryPrice = 0;

    return {
      originalPrice: originalPrice, //원가
      price: price, //현재판매가
      discountPrice: (originalPrice - price) * -1,
      deliveryPrice: 0,
      totalPrice: price + deliveryPrice,
    };
  }, [items]);

  return (
    <CommonLayout>
      <div className={styles.cart_container}>
        <h1 className={styles.cart_title}>쇼핑백</h1>
        <div className={styles.stage_wrap}>
          {stages.map((stage, index) => (
            <p
              className={classNames({
                [styles.current_stage]: currentStage == stage.id,
                [styles.stage]: true,
              })}
            >
              {stage.label}{" "}
              {index + 1 !== stages.length && <ChevronRightIcon />}
            </p>
          ))}
        </div>
        <div className={styles.cart_content_wrapper}>
          <div className={styles.cart_list_wrapper}>
            <p className={styles.cart_subtitle}>상품정보</p>
            <div className={styles.cart_header_wrap}>
              <div className={styles.header_icon_wrap}>
                <DefaultCheckbox
                  checked={checkedAll}
                  onChange={toggleAllItemsChecked}
                />
                <p>
                  선택 상품
                  <span className={styles.item_total}>{checkedItems.length}</span>
                </p>
              </div>
              <div className={styles.header_icon_wrap}>
                <DeleteForeverIcon />
                <p>선택 삭제</p>
              </div>
            </div>

            {items.map((item, index) => (
              <div key={index} className={styles.cart_item_wrapper}>
                <div className={styles.cart_item_header}>
                  <LocalOfferIcon />
                  <p>브랜드명</p>
                </div>
                <div className={styles.cart_item_body}>
                  <div className={styles.first_item_content}>
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
                    <img src={require("assets/images/sub/sub17.jpg")} alt="" />
                    <div className={styles.item_option_wrap}>
                      <p>상품명</p>
                      <div className={styles.item_options}>
                        <p>옵션명</p>
                        <div className={styles.item_option_button}>
                          옵션/수량 변경
                          <ExpandMoreIcon />
                        </div>
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
                    <div className={styles.buy_button_wrap}>
                      <p className={styles.buy_button}>바로 구매</p>
                      <div className={styles.delete_button}>
                        <DeleteForeverIcon />
                        <p>삭제</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.payment_information_wrapper}>
            <p className={styles.payment_title}>결제정보</p>
            <div className={styles.receipt_wrap}>
              <div className={styles.default_flex_space}>
                <p className={styles.receipt_title}>주문금액</p>
                <p>
                  <strong>{numberWithCommas(receipt?.originalPrice)}</strong> 원
                </p>
              </div>
              <div className={styles.receipt_detail_wrap}>
                <div className={styles.default_flex_space}>
                  <p className={styles.receipt_title}>상품 금액</p>
                  <p>{numberWithCommas(receipt?.totalPrice)}원</p>
                </div>
                <div className={styles.default_flex_space}>
                  <p className={styles.receipt_title}>할인금액</p>
                  <p>{numberWithCommas(receipt?.discountPrice)}원</p>
                </div>
                <div className={styles.default_flex_space}>
                  <p className={styles.receipt_title}>배송비</p>
                  <p>{numberWithCommas(receipt?.deliveryPrice)}원</p>
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
            />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
