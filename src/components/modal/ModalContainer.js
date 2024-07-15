import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";

import styles from "styles/_common.module.scss";

export const ModalContainer = ({
  visible,
  setVisible,
  children,
  title = "",
}) => {
  const handleClose = () => setVisible(false);

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
      >
        <div className={styles.modal_container}>
          <div className={styles.modal_header}>
            <h2>{title}</h2>
            <div className={styles.close_button} onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
          <div className={styles.modal_content}>{children}</div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
