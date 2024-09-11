import React, { useState } from "react";

import classNames from "classnames";
import { categoryList } from "models/category";
import { Device } from "models/device";
import { useParams } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import { MobileLayout } from "components/common";

import styles from "styles/_category.module.scss";

import NotFound from "./NotFound";

export default function CategoryMenu() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  return (
    <MobileLayout headerTitle="CATEGORY" isBottomNavigation={true}>
      <div className={styles.category_menu_container}>
        <div className={styles.category_wrapper}>
          {categoryList.map((category) => (
            <p
              className={classNames({
                [styles.current_category]: selectedCategory == category,
              })}
            >
              {category.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
