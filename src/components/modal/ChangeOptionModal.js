import React from "react";

import { numberWithCommas } from "utilities";

import { DefaultButton } from "components/common";
import { ColorOptions, QuantityOptions, SizeOptions } from "components/detail";

import styles from "styles/_common.module.scss";

import { ModalContainer } from "./ModalContainer";

export const ChangeOptionModal = ({
  visible,
  setVisible,
  onSubmit,
  colors = [],
  sizes = [],
  isQuantity = true,
  setSelectedItem,
  selectedItem,
}) => {
  return (
    <ModalContainer visible={visible} setVisible={setVisible} title="옵션 변경">
      <div className={styles.change_item_options_modal}>
        {!!colors.length && <ColorOptions colorOptions={colors} />}
        {!!sizes.length && <SizeOptions sizeOptions={sizes} />}
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
          onClick={() => setVisible(false)}
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
