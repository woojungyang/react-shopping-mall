import React, { useState } from "react";

import { addItem } from "app/counterSlice";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import classNames from "classnames";
import { Device } from "models/device";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiscountPercent, numberWithCommas } from "utilities";

import useCartItemsMutation from "hooks/mutation/useCartItemsMutation";
import useDeleteLikeMutation from "hooks/mutation/useDeleteLikeMutation";
import useItemQuery from "hooks/query/useItemQuery";
import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { LikeHeart } from "components/card";
import { Loading } from "components/common";
import { ChangeOptionModal, ToastModal } from "components/modal";

import styles from "styles/_mypage.module.scss";

export const HeartCard = ({
  item = {},
  isExpansion = false,
  showButton = true,
}) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const [toastMessage, setToastMessage] = useState("");

  const [selectedOption, setSelectedOption] = useState({});
  const [changeOptionsModal, setChangeOptionsModal] = useState(false);

  const itemQuery = useItemQuery(
    item.id,
    {},
    {
      enabled: false,
      onSuccess: () => setChangeOptionsModal(true),
    },
  );

  const [currentTab] = useQueryString("currentTab");

  const cartItemMutation = useCartItemsMutation();
  async function requestPatchCartItem() {
    try {
      console.log(selectedOption);
      const findOption = itemQuery.data.options.find(
        (item) =>
          item.color == selectedOption.color &&
          item.size == selectedOption.size,
      );
      const selectedItem = {
        id: item.id,
        optionsId: findOption.id,
        quantity: selectedOption?.quantity,
      };

      await cartItemMutation.mutateAsync([selectedItem]);

      dispatch(addItem(selectedItem));
      setToastMessage("쇼핑백에 추가되었습니다.");
      setTimeout(() => {
        queryClient.refetchQueries([`/api/v1/likes`, { type: currentTab }]);
      }, 1500);
    } catch (err) {
      setToastMessage(err.message);
    }
  }

  const deleteLikeMutation = useDeleteLikeMutation(item.id);
  async function requestDeleteLikeItem() {
    try {
      deleteLikeMutation.mutateAsync({
        type: currentTab,
      });

      queryClient.refetchQueries([`/api/v1/likes`, { type: currentTab }]);
    } catch (err) {
      setToastMessage(err.message);
    }
  }

  return (
    <div
      className={classNames({
        [styles.heart_card_item_wrap]: true,
        [styles.expansion_card]: isExpansion,
        [styles.heart_card_item_wrap_mobile]: !isDeskTop,
      })}
    >
      {itemQuery.isLoading ||
      cartItemMutation.isLoading ||
      requestDeleteLikeItem.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.item_thumbnail}>
            <LikeHeart
              like={item.like ?? true}
              position={
                isDeskTop
                  ? { right: "14%", top: "4%" }
                  : { right: "18%", top: "4%" }
              }
              onClick={requestDeleteLikeItem}
            />
            <img
              src={item?.thumbnail}
              onClick={() => navigation(`/items/${item.id}`)}
            />
          </div>
          <div className={styles.item_info_wrap}>
            <div>
              <p className={styles.brand_name}>{item?.brandName}</p>
              <p className={styles.item_name}>{item?.itemName}</p>
              <div className={styles.price_info_wrap}>
                <p className={styles.current_price}>
                  {numberWithCommas(item?.price)}원{" "}
                  <span className={styles.original_price}>
                    {numberWithCommas(item?.originalPrice)}원
                  </span>
                </p>

                <p className={styles.sale_percent}>
                  {getDiscountPercent(item?.price, item?.originalPrice)}%
                </p>
              </div>
            </div>

            {showButton ? (
              item?.isSoldOut ? (
                <p
                  className={classNames({
                    [styles.add_cart_button]: true,
                    [styles.sold_out_button]: true,
                  })}
                  onClick={requestDeleteLikeItem}
                >
                  <DeleteOutlineOutlinedIcon /> 품절
                </p>
              ) : (
                <p
                  className={styles.add_cart_button}
                  onClick={() => itemQuery.refetch()}
                >
                  <LocalMallOutlinedIcon />
                  쇼핑백
                </p>
              )
            ) : null}
          </div>
        </>
      )}

      {changeOptionsModal && (
        <ChangeOptionModal
          item={itemQuery.data}
          visible={changeOptionsModal}
          setVisible={setChangeOptionsModal}
          selectedItemOptions={selectedOption}
          setSelectedItemOptions={setSelectedOption}
          onSubmit={requestPatchCartItem}
        />
      )}
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </div>
  );
};
