import React, { useEffect, useMemo, useRef, useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "styles/_main.module.scss";

import { BasicSlider } from "./BasicSlider";

const DefaultBanner = () => {
  return null;
};

export const BestCardsSlider = ({ items = [], banner, perItems = 5 }) => {
  const sliderRef = useRef(null);

  const [currentItems, setCurrentItems] = useState(
    [...items, ...items].map((e, index) => ({
      sliderIndex: index + 1,
      item: e,
    })),
  );
  const [currentIndex, setCurrentIndex] = useState(perItems);

  // useEffect(() => {
  //   // 초기 상태 설정
  //   setCurrentItems(items.slice(0, perItems));
  // }, [items, perItems]);

  const handlePrevClick = () => {
    if (sliderRef.current) {
      setCurrentIndex(currentIndex - 1);

      const container = sliderRef.current;
      const itemWidth = container.firstChild.offsetWidth + 10; // marginRight

      container.style.transition = "none"; // Transition을 비활성화
      container.scrollBy({ left: -itemWidth, behavior: "smooth" });

      // setTimeout(() => {
      //   const newItems = [
      //     currentItems[currentItems.length - 1],
      //     ...currentItems.slice(0, -1),
      //   ];
      //   setCurrentItems(newItems);
      //   container.scrollTo({
      //     left: container.scrollWidth - itemWidth,
      //     behavior: "smooth",
      //   });
      //   container.style.transition = "scroll-left 0.3s ease"; // Transition을 복원
      // }, 300); // 애니메이션 완료 후 이동
    }
  };

  const sliderStandard = items.length / 2;

  const handleNextClick = () => {
    if (sliderRef.current) {
      setCurrentIndex(currentIndex + 1);
      const sliderNumber = currentIndex % sliderStandard;
      const prevIndex = currentItems.shift();
      setCurrentItems((prevArray) => {
        const firstElement = prevArray[0];
        prevArray.shift();
        const newArray = [...prevArray, ...[firstElement]];
        return newArray;
      });
      /*  if (currentIndex >= sliderStandard && sliderNumber == 0) {
        console.log(currentIndex);
        const newArray = [
          ...currentItems.filter((e) => e.sliderIndex > currentIndex - 1),
          ...currentItems.filter((e) => e.sliderIndex <= currentIndex - 1),
        ];
        console.log(newArray);
        setCurrentItems(newArray);

        // setCurrentIndex([
        //   ...currentItems.filter((e) => e.sliderIndex > currentIndex),
        //   ...currentItems.filter((e) => e.sliderIndex < currentIndex),
        // ]);
        // setCurrentItems([
        //   ...currentItems.filter((e) => e.sliderIndex > currentIndex),
        //   ...currentItems.filter((e) => e.sliderIndex <= currentIndex),
        // ]);
      } */
      const container = sliderRef.current;
      const itemWidth = container.firstChild.offsetWidth + 10; // marginRight

      container.style.transition = "none"; // Transition을 비활성화
      container.scrollBy({ left: itemWidth, behavior: "smooth" });

      // setTimeout(() => {
      //   const newItems = [...currentItems.slice(1), currentItems[0]];
      //   setCurrentItems(newItems);
      //   container.scrollTo({ left: 0, behavior: "smooth" });
      //   container.style.transition = "scroll-left 0.3s ease"; // Transition을 복원
      // }, 300); // 애니메이션 완료 후 이동
    }
  };

  const testRef = useRef(null);

  // const bannerWidth = useMemo(() => {
  //   if (testRef.current && testRef.current.offsetWidth)
  //     return testRef.current.offsetWidth;
  //   else return 0;
  // }, [testRef.current]);

  // console.log(bannerWidth);

  const [bannerWidth, setBannerWidth] = useState(0);

  useEffect(() => {
    if (testRef.current && testRef.current.offsetWidth)
      setBannerWidth(testRef.current.offsetWidth + 20);
  }, [testRef.current]);

  console.log(bannerWidth);

  const RenderComponent = banner ?? DefaultBanner;

  console.log(testRef?.current?.offsetWidth);
  return (
    <div className={styles.best_product_container}>
      <div ref={testRef}>
        <RenderComponent r />
      </div>
      <div className={styles.default_item_slider_container}>
        {/* <ArrowBackIosIcon
          className={styles.slider_arrow}
          style={{ left: "-3%" }}
          onClick={handlePrevClick}
        /> */}
        <div
          className={styles.default_item_slider_wrapper}
          style={{
            width: bannerWidth > 0 ? `calc(100% - ${bannerWidth}px)` : "100%",
            marginLeft: bannerWidth > 0 ? 20 : 0,
          }}
        >
          <BasicSlider
            settings={{
              // dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: !!bannerWidth ? 3 : 5,
              slidesToScroll: 1,
            }}
          >
            {items.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    width: "100%",
                    // marginRight: 10,
                    height: 100,
                    backgroundColor: "orange",
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </BasicSlider>
        </div>
        {/* <div
          ref={sliderRef}
          className={styles.default_item_slider_wrapper}
          style={{ display: "flex", overflowX: "hidden", whiteSpace: "nowrap" }}
        >
          {currentItems.map((item, index) => (
            <div
              key={index}
              style={{
                minWidth: 264,
                marginRight: 10,
                display: "inline-block",
              }}
            >
              <div>{item.sliderIndex}</div>
            </div>
          ))}
        </div> */}
        {/* <ArrowForwardIosIcon
          className={styles.slider_arrow}
          style={{ right: "-3.70%" }}
          onClick={handleNextClick}
        /> */}
      </div>
    </div>
  );
};
