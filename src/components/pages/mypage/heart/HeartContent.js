import React, { useEffect } from "react";

import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CropDinOutlinedIcon from "@mui/icons-material/CropDinOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { categoryList } from "models/category";
import { HeartType } from "models/mypage";
import { OrderState, getOrderState } from "models/order";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import useOrdersQuery from "hooks/query/useOrdersQuery";
import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { LoadingLayer, SelectBox } from "components/common";
import { Table, TableFilter, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";
import SearchFilter from "../SearchFilter";

export default function HeartContent() {
  const navigation = useNavigate();

  const [startDate, endDate, updateDates] = useDateIntervalQueryString(
    "startDate",
    "endDate",
    formatDateTime(addMonths(now(), -1)),
    formatDateTime(now()),
  );

  const [selectedOrderState, changeSelectedOrderState] =
    useQueryString("selectedOrderState");

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 5);
  const handleChangePage = (_event, page) => changePage(page);

  const [currentTab, changeCurrentTab] = useQueryString(
    "currentTab",
    HeartType.Item,
  );
  const [selectedCategory, changeSelectedCategory] = useQueryString(
    "selectedCategory",
    "",
  );

  // if (isLoading) return <LoadingLayer />;

  return (
    <MyPageLayout>
      <div className={styles.my_heart_container}>
        <div className={styles.heart_filter_wrapper}>
          {menuList.map((menu, index) => (
            <p
              className={styles.heart_filter}
              key={index}
              onClick={() => changeCurrentTab(menu.id)}
            >
              {currentTab == menu.id ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
              {menu.label}()
            </p>
          ))}
        </div>
        <div className={styles.heart_items_filter}>
          <div>
            <CropDinOutlinedIcon />
            <AppsOutlinedIcon />
          </div>
          <div>
            <TableFilter
              filterOptions={categoryList.map((e) => {
                return { id: e, label: e.toUpperCase() };
              })}
              selectedOption={selectedCategory}
              onClick={changeSelectedCategory}
            />
          </div>
        </div>
      </div>
    </MyPageLayout>
  );
}

const menuList = [
  { id: HeartType.Item, label: "MY ITEMS" },
  { id: HeartType.Brand, label: "MY BRANDS" },
  { id: HeartType.Style, label: "MY STYLES" },
];
