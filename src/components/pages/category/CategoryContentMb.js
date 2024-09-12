import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AppsIcon from "@mui/icons-material/Apps";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import classNames from "classnames";
import { filterList, getSubCategory } from "models/category";
import { Device } from "models/device";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

import { ApiClientQuery } from "hooks/apiClient/useApiClient";
import useCategoryOverviewQuery from "hooks/query/useCategoryOverviewQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";
import { useScrollToElement } from "hooks/scroll/useScrollToElement";
import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard } from "components/card";
import {
  Loading,
  LoadingLayer,
  MobileLayout,
  SelectBox,
} from "components/common";
import { ToastModal } from "components/modal";
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
        sort: sort,
        subCategory: currentSubCategory.id,
        smallCategory: currentSubCategory.depth,
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
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["items", sort], fetchItems, {
    getNextPageParam: (lastPage, pages) => {
      const total = getPageCount(pages[0].total);
      if (pages.length < total) return pages.length + 1;
      else return undefined;
    },
    keepPreviousData: true,
  });

  const [zoomIn, setZoomIn] = useState(false);

  const subCategories = getSubCategory(categoryName);

  const [subCategory, changeSubCategory] = useQueryString("subCategory", "");
  const [smallCategory, changeSmallCategory] = useQueryString(
    "smallCategory",
    "",
  );
  const [currentSubCategory, setCurrentSubCategory] = useState({
    id: subCategory || subCategories[0].id,
    depth: smallCategory,
  });

  const currentDepth = useMemo(
    () => subCategories.find((e) => e.id == currentSubCategory.id).depth,
    [currentSubCategory],
  );

  const [scrollLoading, setScrollLoading] = useState(false);

  useEffect(() => {
    if (!!subCategory) {
      setScrollLoading(true);
      const timer = setTimeout(() => {
        const element1 = document.getElementsByClassName("sub_category")[0];
        const element2 = document.getElementsByClassName("small_category")[0];
        const container = document.getElementById("scrollTarget");
        if (element1) {
          window.scrollTo({
            top: container.offsetTop,
            behavior: "smooth",
          });
          setScrollLoading(false);

          const subMenu = document.querySelector("#sub_menu");
          if (subMenu) {
            subMenu.scrollLeft = element1.offsetLeft - element1.offsetWidth;
          }
        }

        if (element2) {
          const smallMenu = document.querySelector("#small_menu");
          if (smallMenu) {
            smallMenu.scrollLeft =
              element2.offsetLeft - element2.offsetWidth + 20;
          }
        }
      }, 2000); // 100ms 지연
      return () => clearTimeout(timer);
    }
  }, [subCategory, smallCategory, sort]);

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

  const { scrollToElement, setElementRef } = useScrollToElement();
  const handleSortChange = (value) => {
    changeSort(value);
    // setTimeout(() => scrollToElement("topItem"), 100);
  };

  return (
    <MobileLayout
      headerTitle={categoryName.toUpperCase()}
      isBottomNavigation={true}
    >
      {(overviewLoading || isLoading || isFetching || scrollLoading) && (
        <LoadingLayer />
      )}
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
              const checkIndex = clearanceCurrentIndex === index;
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
                      marginBottom: index % 1 === 0 ? "50px" : "",
                    }}
                  />
                </div>
              ))}
            </CustomSliderContainer>
          </div>
        </div>

        <div className={styles.category_all_items_container} id="scrollTarget">
          <div
            className={classNames({
              [styles.subcategory_filter_wrap]: true,
            })}
            ref={setElementRef("topItem")}
          >
            <div className={styles.subcategory_wrap} id="sub_menu">
              {subCategories.map((subCategory, index) => {
                const active = currentSubCategory.id == subCategory.id;
                return (
                  <p
                    key={index}
                    onClick={() => {
                      const newCategory = {
                        id: subCategory.id,
                        depth: subCategory?.depth?.[0].id,
                      };
                      setCurrentSubCategory(newCategory);
                      changeSubCategory(newCategory.id);
                    }}
                    className={classNames({
                      [styles.active_category]: active,
                      sub_category: active,
                    })}
                  >
                    {subCategory.label}
                  </p>
                );
              })}
            </div>
            {currentDepth?.length && (
              <div className={styles.depth_wrapper} id="small_menu">
                {currentDepth?.map((depth) => {
                  const active = currentSubCategory.depth == depth.id;
                  return (
                    <p
                      onClick={() => {
                        setCurrentSubCategory({
                          ...currentSubCategory,
                          depth: depth.id,
                        });
                        changeSmallCategory(depth.id);
                      }}
                      className={classNames({
                        [styles.depth]: true,
                        [styles.depth_active]: active,
                        small_category: active,
                      })}
                    >
                      {depth.sub}
                    </p>
                  );
                })}
              </div>
            )}

            <div className={styles.order_filter_wrap}>
              <SelectBox
                options={filterList}
                selectedValue={sort || filterList[0]?.sort}
                onChange={handleSortChange}
                style={{ left: 0 }}
              />
              <div
                className={styles.filter_icon_wrap}
                onClick={() => setZoomIn(!zoomIn)}
              >
                {!zoomIn ? <AppsIcon /> : <CropSquareIcon />}
              </div>
            </div>
          </div>
          <div
            className={classNames({
              [styles.all_items_wrapper]: true,
              [styles.all_items_zoom]: !zoomIn,
              [styles.all_items_zoom_in]: zoomIn,
            })}
          >
            {items?.pages?.flatMap((page) =>
              page.data.map((item, index) => (
                <ItemCard
                  key={index}
                  showStatus={true}
                  style={{ height: zoomIn ? "400px" : "300px" }}
                  item={item}
                />
              )),
            )}
          </div>
        </div>

        <div ref={observer}>
          {isFetchingNextPage || hasNextPage ? <Loading /> : null}
        </div>
      </div>
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </MobileLayout>
  );
}
