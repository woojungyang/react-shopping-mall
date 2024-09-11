import React, { useMemo, useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import classNames from "classnames";
import { categoryList, getSubCategory } from "models/category";
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

  const [category, setCategory] = useState([]);

  const updateCategory = useMemo(
    () =>
      setCategory(
        getSubCategory(selectedCategory)
          .slice(1)
          .map((e) => {
            return { ...e, toggle: false };
          }),
      ),
    [selectedCategory],
  );

  return (
    <MobileLayout headerTitle="CATEGORY" isBottomNavigation={true}>
      <div className={styles.category_menu_container}>
        {/* <div>베너 자리임둥</div> */}
        <div className={styles.category_wrapper}>
          {categoryList.map((category) => (
            <p
              className={classNames({
                [styles.current_category]: selectedCategory == category,
              })}
              onClick={() => setSelectedCategory(category)}
            >
              {category.toUpperCase()}
            </p>
          ))}
        </div>
        <div className={styles.sub_category_container}>
          {category?.map((cate) => (
            <div className={styles.sub_category_wrapper}>
              <div
                className={styles.first_depth}
                onClick={() => {
                  setCategory(
                    category.map((cate1) =>
                      cate1.id == cate.id
                        ? { ...cate1, toggle: !cate.toggle }
                        : cate1,
                    ),
                  );
                }}
              >
                <p>{cate.label}</p>
                {cate.toggle ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
              </div>
              {cate.toggle && (
                <div className={styles.second_depth}>
                  {cate?.depth.map((cate2) => (
                    <p>{cate2.label}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
