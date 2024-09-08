import React, { useCallback, useMemo, useRef, useState } from "react";

import AppsIcon from "@mui/icons-material/Apps";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { filterList, getSubCategory } from "models/category";
import { useParams } from "react-router-dom";

import useCategoryOverviewQuery from "hooks/query/useCategoryOverviewQuery";
import useItemsQuery from "hooks/query/useItemsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { ItemCard, SmallCard } from "components/card";
import {
  CommonLayout,
  DefaultPagination,
  Loading,
  LoadingLayer,
} from "components/common";
import { CustomSliderContainer, FlexBoxSlider } from "components/slider";

import styles from "styles/_category.module.scss";

import PopUpCard from "./PopUpCard";

export default function CategoryContent() {
  const { id: categoryName } = useParams();
  const category = { category: categoryName };

  const { data: overview, isLoading: overviewLoading } =
    useCategoryOverviewQuery(category);

  const [sort, changeSort] = useQueryString("sort", filterList[0].sort);

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 30);
  const handleChangePage = (_event, page) => changePage(page);

  const {
    data: items,
    isLoading,
    isFetching,
  } = useItemsQuery(
    {
      ...category,
      offset: offset,
      limit: limit,
      sort: sort,
    },
    {
      onError: (error) => {
        setToastMessage(error.message);
      },
    },
  );
  const [zoomIn, setZoomIn] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const subCategories = getSubCategory(categoryName);
  const [currentSubCategory, setCurrentSubCategory] = useState(
    subCategories[0].id,
  );

  const bestItems = useMemo(() => {
    if (!overview?.bestItems) return [];
    const items = [...overview?.bestItems];
    items.shift();
    return items;
  }, [overview?.bestItems]);

  const exhibitionRef = useRef(null);
  const exhibitionPrevious = useCallback(
    () => exhibitionRef.current.slickPrev(),
    [],
  );
  const exhibitionNext = useCallback(
    () => exhibitionRef.current.slickNext(),
    [],
  );

  if (overviewLoading) return <LoadingLayer />;

  return (
    <CommonLayout
      isLoading={isLoading}
      setToastMessage={setToastMessage}
      toastMessage={toastMessage}
    >
      <div className={styles.category_container}>
        {/* PROMOTION */}
        <div className={styles.exhibition_container}>
          <p className={styles.section_title}>PROMOTION</p>
          <div className={styles.exhibition_arrow_button_wrap}>
            <div onClick={exhibitionPrevious}>
              <ArrowBackIosIcon />
            </div>
            <div onClick={exhibitionNext}>
              <ArrowForwardIosIcon />
            </div>
          </div>

          <CustomSliderContainer
            ref={exhibitionRef}
            settings={{
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 1,
            }}
          >
            {overview?.events?.map((event, index) => (
              <PopUpCard event={event} key={index} />
            ))}
          </CustomSliderContainer>
        </div>
        <div className={styles.category_best_item_container}>
          <p className={styles.section_title}>WEEKLY BEST </p>
          <div className={styles.category_best_item_wrap}>
            <div className={styles.first_ranking}>
              <div className={styles.rank}>
                <div className={styles.rank_badge}>1</div>
                <ItemCard
                  item={overview?.bestItems[0]}
                  showRank={true}
                  style={{ height: 735 }}
                />
              </div>
            </div>
            <div className={styles.ranking_wrap}>
              {bestItems.map((item, index) => (
                <div className={styles.rank}>
                  <div className={styles.rank_badge}>{index + 2}</div>
                  <ItemCard
                    item={item}
                    key={index}
                    style={{ height: 384 }}
                    showRank={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* md pick */}
        <div className={styles.md_pick_container}>
          <div className={styles.md_pick_wrapper}>
            <p className={styles.section_title}>MD'S PICK </p>
            <FlexBoxSlider
              settings={{
                infinite: false,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 1,
              }}
              arrows={overview?.mdChoice.length > 6}
            >
              {overview?.mdChoice.map((item, index) => {
                return (
                  <div key={index}>
                    <ItemCard
                      item={item}
                      style={{
                        height: "400px",
                      }}
                    />
                  </div>
                );
              })}
            </FlexBoxSlider>
          </div>
        </div>
        <div className={styles.recommend_items_container}>
          <p className={styles.section_title}>YOU MAY ALSO LIKE</p>
          <div className={styles.recommend_items_wrapper}>
            {overview?.recommendedItems.map((item, index) => (
              <ItemCard
                item={item}
                showStatus={true}
                key={index}
                style={{ height: 428 }}
              />
            ))}
          </div>
        </div>

        <div className={styles.category_all_items_container}>
          <div className={styles.category_sidebar}>
            <h3 className={styles.category_name}>
              {categoryName.toUpperCase()}
              <br />
              CATEGORY
            </h3>
            {subCategories.map((subCategory) => {
              const active = currentSubCategory == subCategory.id;
              return (
                <div
                  onClick={() => setToastMessage("준비중입니다.")}
                  className={classNames({
                    [styles.sub_category]: true,
                    [styles.active_category]: active,
                  })}
                >
                  <div className={styles.default_flex}>
                    <p>{subCategory.label}</p>
                    <span>{subCategory.sub}</span>
                  </div>
                  {active && <TrendingFlatIcon />}
                </div>
              );
            })}
          </div>
          <div className={styles.category_contents_wrapper}>
            {isFetching ? (
              <div className={styles.item_loading_wrap}>
                <Loading />
              </div>
            ) : (
              <>
                <div className={styles.filter_wrapper}>
                  <div className={styles.filter_wrap}>
                    {filterList.map((filter, index) => (
                      <span
                        key={index}
                        onClick={() => changeSort(filter.sort)}
                        className={classNames({
                          [styles.active_filter]: sort == filter.sort,
                        })}
                      >
                        {filter.label}
                      </span>
                    ))}
                  </div>
                  <div className={styles.filter_icon_wrap}>
                    <AppsIcon
                      onClick={() => setZoomIn(false)}
                      className={classNames({
                        [styles.active_filter]: !zoomIn,
                      })}
                    />
                    <CropSquareIcon
                      onClick={() => setZoomIn(true)}
                      className={classNames({
                        [styles.active_filter]: zoomIn,
                      })}
                    />
                  </div>
                </div>
                <div
                  className={classNames({
                    [styles.all_items_wrapper]: true,
                    [styles.all_items_zoom]: !zoomIn,
                    [styles.all_items_zoom_in]: zoomIn,
                  })}
                >
                  {items?.data?.map((item, index) => (
                    <ItemCard
                      key={index}
                      showStatus={true}
                      style={{ height: zoomIn ? 500 : 350 }}
                      item={item}
                    />
                  ))}
                </div>
                <DefaultPagination
                  count={getPageCount(items?.total)}
                  page={page}
                  onChange={handleChangePage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
