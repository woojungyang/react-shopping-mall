import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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

  return (
    <CommonLayout isLoading={overviewLoading}>
      <div className={styles.category_container}>
        <div className={styles.category_main_wrapper}>
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
        <div className={styles.exhibition_wrapper}>
          <p className={styles.section_title}>EDITORIAL</p>

          <div className={styles.exhibition_wrap}>
            {/* <hr /> */}
            <div className={styles.exhibition}>
              <img
                className={styles.exhibition_thumbnail}
                src={require("assets/images/sub/sub1.jpg")}
                alt=""
              />
              <p className={styles.title}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className={styles.subtitle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                eveniet asperiores praesentium odio saepe nostrum perspiciatis
                inventore! Impedit tempore eligendi nostrum optio reiciendis non
                veniam placeat, eum possimus, sit temporibus!
              </p>
              <div className={styles.exhibition_item_wrap}>
                <div className={styles.exhibition_item}>
                  <SmallCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
