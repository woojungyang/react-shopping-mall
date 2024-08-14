import React from "react";

import classNames from "classnames";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const SizeOptions = ({
  sizeOptions,
  setSelectedItemOptions,
  selectedItemOptions,
}) => {
  return (
    <DetailContentWrapper title="SIZE">
      <div className={styles.size_options_wrapper}>
        {sizeOptions.map((size, index) => {
          const isSelected = selectedItemOptions?.size == size.size;
          return (
            <p
              key={index}
              onClick={() =>
                setSelectedItemOptions(
                  isSelected ? { ...selectedItemOptions, size: null } : size,
                )
              }
              className={classNames({
                [styles.size_option]: true,
                [styles.selected_size_option]: isSelected,
                [styles.size_option_disabled]: size?.inventory < 1,
              })}
            >
              {size?.size}
            </p>
          );
        })}
      </div>
    </DetailContentWrapper>
  );
};
