import React, { useEffect, useState } from "react";

import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CropDinOutlinedIcon from "@mui/icons-material/CropDinOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classNames from "classnames";
import { categoryList } from "models/category";
import { HeartType } from "models/mypage";
import { OrderState, getOrderState } from "models/order";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import useLikesQuery from "hooks/query/useLikesQuery";
import useOrdersQuery from "hooks/query/useOrdersQuery";
import useDateIntervalQueryString from "hooks/queryString/useDateIntervalQueryString";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { LikeHeart } from "components/card";
import {
  DefaultCheckbox,
  DefaultPagination,
  LoadingLayer,
  SelectBox,
} from "components/common";
import { Table, TableFilter, TableRow } from "components/table";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";
import SearchFilter from "../SearchFilter";
import { HeartCard } from "./HeartCard";

export default function HeartContent() {
  const navigation = useNavigate();

  const [isExpansion, setIsExpansion] = useState(true);
  const [excludingSoldOut, setExcludingSoldOut] = useState(false);

  const [currentTab, changeCurrentTab] = useQueryString(
    "currentTab",
    HeartType.Item,
  );

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 10);
  const handleChangePage = (_event, page) => changePage(page);
  const { data: likes, isLoading } = useLikesQuery({
    type: currentTab,
    limit: limit,
    offset: offset,
    excludingSoldOut: excludingSoldOut,
  });

  const [selectedOrderState, changeSelectedOrderState] =
    useQueryString("selectedOrderState");

  const [selectedCategory, changeSelectedCategory] = useQueryString(
    "selectedCategory",
    "",
  );

  if (isLoading) return <LoadingLayer />;

  return (
    <MyPageLayout>
      <div className={styles.my_heart_container}>
        <div className={styles.heart_filter_wrapper}>
          {menuList.map((menu, index) => (
            <p
              className={classNames({
                [styles.heart_filter]: true,
                [styles.heart_filter_active]: currentTab == menu.id,
              })}
              key={index}
              onClick={() => changeCurrentTab(menu.id)}
            >
              {currentTab == menu.id ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
              MY {menu.label} ({likes?.situation[menu.label.toLowerCase()]})
            </p>
          ))}
        </div>
        {HeartType.Item == currentTab && likes.total > 0 && (
          <div>
            <div className={styles.heart_items_filter}>
              <div>
                <CropDinOutlinedIcon
                  onClick={() => setIsExpansion(true)}
                  className={classNames({
                    [styles.active_filter]: isExpansion,
                  })}
                />
                <AppsOutlinedIcon
                  onClick={() => setIsExpansion(false)}
                  className={classNames({
                    [styles.active_filter]: !isExpansion,
                  })}
                />
              </div>
              <div className={styles.excluding_wrap}>
                <DefaultCheckbox
                  checked={excludingSoldOut}
                  onChange={() => setExcludingSoldOut(!excludingSoldOut)}
                  size="20px"
                />
                <span>품절제외</span>
              </div>
            </div>
            <div
              className={classNames({
                [styles.heart_items_wrapper]: isExpansion,
                [styles.heart_items_wrapper_reduction]: !isExpansion,
              })}
            >
              {likes?.data?.map((item, index) => (
                <HeartCard isExpansion={isExpansion} item={item} key={index} />
              ))}
            </div>
          </div>
        )}
        {HeartType.Style == currentTab && likes.total > 0 && (
          <div
            className={classNames({
              [styles.heart_items_wrapper_reduction]: true,
            })}
          >
            dfsf
            {/* {likes?.data?.map((style, index) => (
              <div className={styles.style_wrap}>
                <img src={style.avatar} />
                <LikeHeart like={true} />
                <p>@{style.username.split("@")[0]}</p>
              </div>
            ))} */}
          </div>
        )}

        {!likes?.total && (
          <div className={styles.empty_heart_wrap}>
            <p className={styles.empty_title}>
              MY {menuList.find((e) => e.id == currentTab).label}에 저장된
              내역이 없습니다.
            </p>
            <p>
              관심있는 컨텐츠를 <FavoriteBorderIcon />
              HEART에 저장 해두시면 한곳에 모아 보실 수 있습니다.
            </p>
          </div>
        )}

        {likes?.total > 0 && (
          <DefaultPagination
            count={getPageCount(likes?.total)}
            page={page}
            onChange={handleChangePage}
          />
        )}
      </div>
    </MyPageLayout>
  );
}

const menuList = [
  { id: HeartType.Item, label: "ITEM" },
  { id: HeartType.Brand, label: "BRAND" },
  { id: HeartType.Style, label: "STYLE" },
];
