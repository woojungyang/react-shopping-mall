import React, { useEffect, useState } from "react";

import { removeItem } from "app/counterSlice";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import { Device } from "models/device";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useCartItemsMutation from "hooks/mutation/useCartItemsMutation";
import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout, DefaultButton, MobileLayout } from "components/common";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_cart.module.scss";

export default function Payment() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [toastMessage, setToastMessage] = useState("");

  const [orderId] = useQueryString("orderId");
  const [message] = useQueryString("message");
  const [itemIds] = useQueryString("itemIds");
  console.log(itemIds);

  const deleteCartItemsMutation = useCartItemsMutation("delete");
  async function requestDeleteCartItems(itemId = "") {
    try {
      const itemArray = itemIds.split(",");
      console.log(itemArray);
      itemArray.map((e) => dispatch(removeItem(e)));

      await deleteCartItemsMutation.mutateAsync({
        ids: itemArray,
      });
    } catch (error) {
      setToastMessage(error.message);
    }
  }

  useEffect(() => {
    if (message) {
      alert(message);
    } else {
      requestDeleteCartItems();
    }
  }, []);

  if (message) <CircularProgress />;

  const currentStage = 3;
  const stages = [
    { id: 1, label: "쇼핑백" },
    { id: 2, label: "주문서" },
    { id: 3, label: "주문완료" },
  ];

  return (
    <>
      {isDeskTop ? (
        <CommonLayout
          isLoading={deleteCartItemsMutation.isLoading}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        >
          <div className={styles.cart_container}>
            <h1 className={styles.cart_title}>주문/결제</h1>
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
            <div
              className={styles.success_order_container}
              style={{ maxWidth: 500, width: "100%", margin: "auto" }}
            >
              <h1>주문이 완료되었습니다.</h1>
              <p className={styles.description}>
                {formatDateTime(now())} 주문하신 상품의 <br />
                주문번호는 <span>{orderId}</span>입니다
              </p>
              <DefaultButton
                label="홈으로 돌아가기"
                onClick={() => navigation("/", { replace: true })}
              />
            </div>
          </div>
        </CommonLayout>
      ) : (
        <MobileLayout headerTitle="주문/결제">
          <div
            className={styles.mobile_cart_container}
            style={{ backgroundColor: "white", paddingBottom: 0 }}
          >
            <div className={styles.success_order_container}>
              <h3>주문이 완료되었습니다.</h3>
              <p className={styles.description}>
                {formatDateTime(now())} 주문하신 상품의 <br />
                주문번호는 <span>{orderId}</span>입니다
              </p>

              <DefaultButton
                label="홈으로 돌아가기"
                onClick={() => navigation("/", { replace: true })}
              />
            </div>
          </div>
        </MobileLayout>
      )}
    </>
  );
}
