import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneIcon from "@mui/icons-material/Done";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

import useCategoryOverviewQuery from "hooks/query/useCategoryOverviewQuery";

import { SmallCard } from "components/card";
import { CommonLayout } from "components/common";
import { CustomSliderContainer } from "components/slider";

import styles from "styles/_category.module.scss";

export default function CategoryContent() {
  const { id: categoryName } = useParams();
  const category = { category: categoryName };

  const { data: overview, isLoading: overviewLoading } =
    useCategoryOverviewQuery(category);

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
  const [currentSubCategory, setCurrentSubCategory] = useState(
    subCategories[0].id,
  );

  return (
    <CommonLayout
      isLoading={overviewLoading}
      setToastMessage={setToastMessage}
      toastMessage={toastMessage}
    >
      <div className={styles.category_container}>
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
        <div className={styles.category_contents_container}>
          {/*  <div className={styles.category_main_wrapper}>
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
          </div> */}
          <div className={styles.exhibition_container}>
            <p className={styles.section_title}>EDITORIAL</p>

            <div className={styles.exhibition_wrap}>
              {overview?.events?.map((event, index) => (
                <div className={styles.exhibition}>
                  <hr />
                  <img
                    className={styles.exhibition_thumbnail}
                    src={event?.thumbnail}
                    alt=""
                  />
                  <p className={styles.title}>{event?.title}</p>
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
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

const subCategories = [
  { id: 1, label: "ALL", sub: "전체" },
  { id: 2, label: "CLOTHING", sub: "의류" },
  { id: 3, label: "BAG&ACC", sub: "가방&악세사리" },
  { id: 4, label: "SHOES", sub: "슈즈" },
];
