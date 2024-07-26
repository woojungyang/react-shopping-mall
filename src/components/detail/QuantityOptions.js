import React from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const QuantityOptions = ({
  setSelectedOptions,
  selectedItemOptions,
}) => {
  return (
    <DetailContentWrapper>
      <div className={styles.detail_quantity_wrapper}>
        <div
          className={styles.quantity_button}
          onClick={() => {
            if (selectedItemOptions.quantity > 1)
              setSelectedOptions({
                ...selectedItemOptions,
                quantity: selectedItemOptions.quantity - 1,
              });
          }}
        >
          <RemoveIcon />
        </div>
        <input type="number" value={selectedItemOptions?.quantity ?? 1} />
        <div
          className={styles.quantity_button}
          onClick={() => {
            setSelectedOptions({
              ...selectedItemOptions,
              quantity: selectedItemOptions.quantity + 1,
            });
          }}
        >
          <AddIcon />
        </div>
      </div>
    </DetailContentWrapper>
  );
};
