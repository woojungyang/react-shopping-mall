import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AppsIcon from "@mui/icons-material/Apps";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DoneIcon from "@mui/icons-material/Done";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { filterList, getSubCategory } from "models/category";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

import useCategoryOverviewQuery from "hooks/query/useCategoryOverviewQuery";
import useItemsQuery from "hooks/query/useItemsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { ItemCard, SmallCard } from "components/card";
import { CommonLayout, DefaultPagination } from "components/common";
import { CustomSliderContainer, ImageSlider } from "components/slider";

import styles from "styles/_category.module.scss";

export default function CategoryContent() {
  const { id: categoryName } = useParams();
  const category = { category: categoryName };

  const { data: overview, isLoading: overviewLoading } =
    useCategoryOverviewQuery(category);

  const [sort, changeSort] = useQueryString("sort", filterList[0].sort);

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 24);
  const handleChangePage = (_event, page) => changePage(page);

  const { data: items, isLoading } = useItemsQuery(
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerPadding: "30%",
    centerMode: true,
  };

  const sliderRef = useRef(null);
  const previous = useCallback(() => sliderRef.current.slickPrev(), []);
  const next = useCallback(() => sliderRef.current.slickNext(), []);

  const [currentSlideWidth, setCurrentSlideWidth] = useState(0);

  const updateSlideWidth = () => {
    const slideWidth = window.innerWidth - window.innerWidth * 0.3 * 2;
    setCurrentSlideWidth(slideWidth);
  };

  useEffect(() => {
    updateSlideWidth();

    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

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

  return (
    <CommonLayout
      isLoading={overviewLoading || isLoading}
      setToastMessage={setToastMessage}
      toastMessage={toastMessage}
    >
      <div className={styles.category_container}>
        {/*   <div className={styles.category_main_wrapper}>
          <Slider ref={sliderRef} {...settings}>
            {overview?.mainSlide.map((slider, index) => (
              <div className={styles.category_main_wrap} key={index}>
                <img src={slider.url} className={styles.category_main_img} />
                <div className={styles.copyright_wrap}>
                  <p className={styles.copyright_title}>{slider?.title}</p>
                  <p className={styles.copyright_sub}>{slider?.subTitle}</p>
                </div>
              </div>
            ))}
          </Slider>
          <div
            className={styles.arrow_wrap}
            style={{ width: currentSlideWidth + 100 }}
          >
            <ArrowBackIosIcon onClick={previous} />
            <ArrowForwardIosIcon onClick={next} />
          </div>
        </div>
        <div className={styles.exhibition_container}>
          <p className={styles.section_title}>MEMBERS-ONLY SPECIAL</p>

          <div className={styles.exhibition_wrap}>
            {overview?.events?.map((event, index) => (
              <div className={styles.exhibition}>
                <hr />
                <img
                  className={styles.exhibition_thumbnail}
                  src={event?.thumbnail}
                  alt=""
                />
                <p className={styles.title}>
                  [{event?.keyword}]
                  <br />
                  {event?.title}
                </p>
                <p className={styles.subtitle}>{event?.subTitle}</p>
                <div className={styles.exhibition_item_wrap}>
                  {event?.items?.map((item) => (
                    <div className={styles.exhibition_item}>
                      <SmallCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* pop-up */}
        <div className={styles.exhibition_container}>
          <p className={styles.section_title}>POP-UP</p>
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
              <div className={styles.exhibition}>
                <hr />
                <img
                  className={styles.exhibition_thumbnail}
                  src={event?.thumbnail}
                  alt=""
                />
                <p className={styles.title}>
                  [{event?.keyword}]
                  <br />
                  {event?.title}
                </p>
                <p className={styles.subtitle}>{event?.subTitle}</p>
                <div className={styles.exhibition_item_wrap}>
                  {event?.items?.map((item) => (
                    <div className={styles.exhibition_item}>
                      <SmallCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
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
                  style={{ height: 778 }}
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
            <div></div>
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
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

{
  /*   */
}
