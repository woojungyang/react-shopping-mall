import React from "react";

import classNames from "classnames";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const SizeOptions = ({ sizeOptions, setSelectedItem, selectedItem }) => {
  return (
    <DetailContentWrapper title="SIZE">
      <div className={styles.size_options_wrapper}>
        {sizeOptions.map((size, index) => {
          const isSelected = selectedItem?.size == size.size;
          return (
            <p
              key={index}
              onClick={() => {
                setSelectedItem({ ...selectedItem, size: size?.size });
              }}
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
