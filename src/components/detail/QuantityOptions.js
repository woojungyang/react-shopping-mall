import React, { useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classNames from "classnames";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const QuantityOptions = ({
  setSelectedItemOptions,
  selectedItemOptions = {},
}) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  useEffect(() => {
    if (!selectedItemOptions?.quantity) {
      setSelectedItemOptions({ ...selectedItemOptions, quantity: 1 });
    }
  }, [selectedItemOptions, setSelectedItemOptions]);

  return (
    <DetailContentWrapper>
      <div
        className={classNames({
          [styles.detail_quantity_wrapper]: true,
          [styles.detail_quantity_wrapper_mb]: !isDeskTop,
        })}
      >
        <div
          className={styles.quantity_button}
          onClick={() => {
            if (selectedItemOptions.quantity > 1)
              setSelectedItemOptions({
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
            setSelectedItemOptions({
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
