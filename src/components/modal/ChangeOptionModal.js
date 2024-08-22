import React from "react";

import { numberWithCommas } from "utilities";

import { DefaultButton } from "components/common";
import { ColorOptions, QuantityOptions, SizeOptions } from "components/detail";

import styles from "styles/_common.module.scss";

import { ModalContainer } from "./ModalContainer";

export const ChangeOptionModal = ({
  item = {},
  visible,
  setVisible,
  onSubmit,
  isQuantity = true,
  setSelectedItem,
  selectedItem,
}) => {
  const colorOptions = item?.options?.reduce((acc, current) => {
    if (!acc.some((item) => item.color === current.color)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const sizeOptions = item?.options?.filter(
    (option) => option.color == selectedItem.color,
  );

  return (
    <ModalContainer visible={visible} setVisible={setVisible} title="옵션 변경">
      <div className={styles.change_item_options_modal}>
        {!!colorOptions.length && (
          <ColorOptions
            colorOptions={colorOptions}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
        {!!sizeOptions.length && (
          <SizeOptions
            sizeOptions={sizeOptions}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
        {isQuantity && (
          <QuantityOptions
            setSelectedItemOptions={setSelectedItem}
            selectedItemOptions={selectedItem}
          />
        )}
      </div>
      <div className={styles.change_item_price_wrap}>
        <p>결제 예정 금액</p>
        <p>
          <strong>{numberWithCommas(selectedItem.price)}</strong>원
        </p>
      </div>
      <div className={styles.default_flex_space}>
        <DefaultButton
          label="취소"
          className={styles.button_skeleton_100_color_background_100}
          onClick={() => {
            setVisible(false);
            setSelectedItem({});
          }}
        />
        <DefaultButton
          label="변경"
          onClick={() => {
            setVisible(false);
            onSubmit?.();
          }}
        />
      </div>
    </ModalContainer>
  );
};
