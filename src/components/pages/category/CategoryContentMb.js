import React, { useCallback, useEffect, useRef, useState } from "react";

import AppsIcon from "@mui/icons-material/Apps";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { filterList, getSubCategory } from "models/category";
import { Device } from "models/device";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

import { ApiClientQuery } from "hooks/apiClient/useApiClient";
import useCategoryOverviewQuery from "hooks/query/useCategoryOverviewQuery";
import useItemsQuery from "hooks/query/useItemsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard } from "components/card";
import { CommonLayout, DefaultPagination, Loading } from "components/common";
import { CustomSliderContainer, ScrollableSlider } from "components/slider";

import styles from "styles/_category.module.scss";

import PopUpCard from "./PopUpCard";

export default function CategoryContentMb() {
  const { id: categoryName } = useParams();
  const category = { category: categoryName };

  const { data: overview, isLoading: overviewLoading } =
    useCategoryOverviewQuery(category);

  const [clearanceCurrentIndex, setClearanceCurrentIndex] = useState(0);
  const userDevice = useUserDevice();
  const isMobile = userDevice == Device.Mobile;

  const [sort, changeSort] = useQueryString("sort", filterList[0].sort);

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 30);

  const fetchItems = async ({ pageParam = 0 }) => {
    const response = await ApiClientQuery({
      url: "/api/v1/items",
      params: {
        offset: pageParam * limit,
        limit: limit,
      },
      method: "get",
    });
    return response;
  };

  const {
    data: items,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery("orders", fetchItems, {
    getNextPageParam: (lastPage, pages) => {
      const total = getPageCount(pages[0].total);
      if (pages.length < total) return pages.length + 1;
      else return undefined;
    },
  });
  const [zoomIn, setZoomIn] = useState(false);

  const subCategories = getSubCategory(categoryName);
  const [currentSubCategory, setCurrentSubCategory] = useState(
    subCategories[0].id,
  );

  const [toastMessage, setToastMessage] = useState("");

  const observerElem = useRef();

  const observer = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerElem.current) observerElem.current.disconnect();

      observerElem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerElem.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const targetPosition = 200; // 파란색 라인 부분의 Y 위치 (적절히 조정 필요)

      if (scrollPosition >= targetPosition) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <CommonLayout
      isLoading={overviewLoading || isLoading}
      toastMessage={toastMessage}
      setToastMessage={setToastMessage}
    >
      <div className={styles.mobile_category_container}>
        <div className={styles.exhibition_container}>
          <p className={styles.section_title}>PROMOTION</p>
          <CustomSliderContainer
            setCurrentIndex={setClearanceCurrentIndex}
            settings={{
              infinite: true,
              speed: 500,
              centerMode: true,
              centerPadding: isMobile ? "40px" : "150px",
              slidesToShow: 1,
              slidesToScroll: 1,
            }}
          >
            {overview?.events?.map((event, index) => {
              const checkIndex = clearanceCurrentIndex == index;
              return (
                <PopUpCard
                  event={event}
                  key={index}
                  className={!checkIndex ? styles.exhibition_disabled : ""}
                />
              );
            })}
          </CustomSliderContainer>
        </div>
        <div className={styles.category_best_item_container}>
          <p className={styles.section_title}>WEEKLY BEST</p>
          <ScrollableSlider>
            {overview?.bestItems?.map((item, index) => (
              <div className={styles.category_best_item} key={index}>
                <div className={styles.rank}>{index + 1}</div>
                <ItemCard
                  showRank={true}
                  item={item}
                  style={{
                    height: 300,
                    flex: "0 0 calc(31% - 10px)",
                    minWidth: 200,
                  }}
                />
              </div>
            ))}
          </ScrollableSlider>
        </div>
        <div className={styles.category_md_pick_container}>
          <p className={styles.section_title}>MD'S PICK</p>
          <ScrollableSlider>
            {overview?.mdChoice?.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                style={{
                  height: 300,
                  flex: "0 0 calc(31% - 10px)",
                  minWidth: 200,
                }}
              />
            ))}
          </ScrollableSlider>
        </div>
        <div className={styles.for_u_container}>
          <p className={styles.section_title}>YOU MAY ALSO LIKE</p>
          <div className={styles.scrollable_container}>
            <CustomSliderContainer
              arrows={false}
              settings={{
                rows: 2,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false,
              }}
            >
              {overview?.recommendedItems.map((item, index) => (
                <div className={styles.default_item_card_container} key={index}>
                  <ItemCard
                    showOriginalPrice={false}
                    item={item}
                    style={{
                      height: 300,
                      marginBottom: index % 1 == 0 ? "50px" : "",
                    }}
                  />
                </div>
              ))}
            </CustomSliderContainer>
          </div>
        </div>
        <div className={styles.category_all_items_container}>
          <div className={styles.subcategory_filter_wrap}>
            <div className={styles.subcategory_wrap}>
              {subCategories.map((subCategory, index) => (
                <p
                  key={index}
                  onClick={() => setToastMessage("준비중입니다.")}
                  className={classNames({
                    [styles.active_category]:
                      currentSubCategory == subCategory.id,
                  })}
                >
                  {subCategory.label}
                </p>
              ))}
            </div>

            <div
              className={styles.filter_icon_wrap}
              onClick={() => setZoomIn(!zoomIn)}
            >
              {!zoomIn ? <AppsIcon /> : <CropSquareIcon />}
            </div>
          </div>

          {/*  */}
        </div>
        <div
          className={classNames({
            [styles.all_items_wrapper]: true,
            [styles.all_items_zoom]: !zoomIn,
            [styles.all_items_zoom_in]: zoomIn,
          })}
        >
          {items?.pages?.flatMap((page) =>
            page.data.map((order, index) => (
              <ItemCard
                key={index}
                showStatus={true}
                style={{ height: zoomIn ? 500 : 350 }}
                item={order}
              />
            )),
          )}
        </div>

        <div ref={observer}>
          {isFetchingNextPage || hasNextPage ? <Loading /> : null}
        </div>
      </div>
    </CommonLayout>
  );
}
