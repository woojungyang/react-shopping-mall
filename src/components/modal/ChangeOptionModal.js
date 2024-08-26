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
  setSelectedItemOptions,
  selectedItemOptions,
}) => {
  const colorOptions = item?.options?.reduce((acc, current) => {
    if (!acc.some((item) => item.color === current.color)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const sizeOptions = item?.options?.filter(
    (option) => option.color == selectedItemOptions.color,
  );

  function onClose() {
    setVisible(false);
    setSelectedItemOptions({});
  }

  return (
    <ModalContainer
      visible={visible}
      setVisible={setVisible}
      title="옵션 변경"
      onClose={onClose}
    >
      <div className={styles.change_item_options_modal}>
        {!!colorOptions.length && (
          <ColorOptions
            colorOptions={colorOptions}
            selectedItemOptions={selectedItemOptions}
            setSelectedItemOptions={setSelectedItemOptions}
          />
        )}
        {!!sizeOptions.length && (
          <SizeOptions
            sizeOptions={sizeOptions}
            selectedItemOptions={selectedItemOptions}
            setSelectedItemOptions={setSelectedItemOptions}
          />
        )}
        {isQuantity && (
          <QuantityOptions
            setSelectedItemOptions={setSelectedItemOptions}
            selectedItemOptions={selectedItemOptions}
          />
        )}
      </div>
      <div className={styles.change_item_price_wrap}>
        <p>결제 예정 금액</p>
        <p>
          <strong>{numberWithCommas(item.price)}</strong>원
        </p>
      </div>
      <div className={styles.default_flex_space}>
        <DefaultButton
          label="취소"
          className={styles.button_skeleton_100_color_background_100}
          onClick={onClose}
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
