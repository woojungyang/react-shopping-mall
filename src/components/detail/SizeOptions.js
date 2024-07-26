import React from "react";

import classNames from "classnames";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const SizeOptions = ({
  sizeOptions,
  setSelectedOptions,
  selectedItemOptions,
}) => {
  const disabled_size = 4;
  return (
    <DetailContentWrapper title="SIZE">
      <p className={styles.selected_option_name}>{selectedItemOptions?.size}</p>
      <div className={styles.size_options_wrapper}>
        {sizeOptions.map((size, index) => {
          const isSelected = selectedItemOptions?.size == index;
          return (
            <p
              onClick={() =>
                setSelectedOptions({
                  ...selectedItemOptions,
                  size: isSelected ? null : index,
                })
              }
              className={classNames({
                [styles.size_option]: true,
                [styles.selected_size_option]: isSelected,
                [styles.size_option_disabled]: disabled_size == index,
              })}
            >
              {index}
            </p>
          );
        })}
      </div>
    </DetailContentWrapper>
  );
};
