import React from "react";

import styles from "styles/_common.module.scss";

import { ModalContainer } from "./ModalContainer";

export const ConfirmModal = ({ visible, setVisible, contents }) => {
  return (
    <ModalContainer visible={visible} setVisible={setVisible}>
      <div className={styles.confirm_modal_wrapper}>
        <p className={styles.confirm_modal_title}>{contents?.title}</p>
        <div className={styles.button_wrap}>
          <ModalButton button={contents?.leftButton} />
          <ModalButton button={contents?.rightButton} />
        </div>
      </div>
    </ModalContainer>
  );
};

function ModalButton({ button }) {
  const colors = {
    skeleton: "#7d7d7d",
  };

  return (
    <button
      onClick={button?.onClick}
      className={styles.confirm_modal_button}
      style={{ backgroundColor: colors[button?.color] }}
    >
      {button?.label}
    </button>
  );
}
