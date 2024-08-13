import React, { useRef, useState } from "react";

import { ChevronRight } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import classNames from "classnames";
import { Device } from "models/device";
import { getDiscountPercent, numberWithCommas } from "utilities";

import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard, SmallCard } from "components/card";
import { DefaultButton } from "components/common";
import {
  CustomSliderContainer,
  ImageSlider,
  ScrollableSlider,
  SliderPagination,
} from "components/slider";

import { calculatePercent } from "utilities/calculatePercent";

import styles from "styles/_main.module.scss";

export default function MainContentMb({ data }) {
  const [currentMainSliderIndex, setCurrentMainSliderIndex] = useState(0);

  const categoryMenu = [
    { id: 1, name: "OUTERS" },
    { id: 2, name: "TOPS" },
    { id: 3, name: "BOTTOMS" },
    { id: 4, name: "ACCS" },
    { id: 5, name: "SHOES" },
    { id: 6, name: "BEAUTY" },
  ];

  const [clearanceCurrentIndex, setClearanceCurrentIndex] = useState(0);

  const [moreFocus, setMoreFocus] = useState(1);

  const userDevice = useUserDevice();
  const isMobile = userDevice == Device.Mobile;

  if (!data) return null;

  return (
    <div className={styles.main_container_mb}>
      <div className="slider-container" style={{ position: "relative" }}>
        <ImageSlider
          images={data?.mainSlide}
          currentIndex={currentMainSliderIndex}
          setCurrentIndex={setCurrentMainSliderIndex}
        />

        <SliderPagination
          bgColor="black"
          percentColor="#f2d16d"
          customStyle={{
            height: 5,
            marginTop: -5,
            width: `100%`,
          }}
          percent={calculatePercent(
            currentMainSliderIndex,
            data?.mainSlide?.length,
          )}
        />
      </div>

      {/*   <div className={styles.category_wrapper_mb}>
        <ScrollableSlider showScroll={false}>
          {categoryMenu.map((menu) => (
            <div className={styles.category_wrap_mb}>
              <img
                src={require("assets/images/sub/sub24.jpg")}
                alt=""
                className={styles.category_icon}
              />
              <p className={styles.category_name}>{menu.name}</p>
            </div>
          ))}
        </ScrollableSlider>
      </div> */}

      {/* for u */}
      <div className={styles.for_u_container}>
        <h3 className={styles.section_title}>ITEMS FOR YOU</h3>
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
            {data?.recommendedItems.map((item, index) => (
              <div className={styles.default_item_card_container} key={index}>
                <ItemCard
                  showStatus={false}
                  showBrand={false}
                  showOriginalPrice={false}
                  item={item}
                  style={{
                    height: 300,
                    marginBottom: index % 1 == 0 ? "30px" : "",
                  }}
                />
              </div>
            ))}
          </CustomSliderContainer>
        </div>
      </div>
      {/* spotlight */}
      <div className={styles.spotlight_container}>
        <h3 className={styles.section_title}>SPOTLIGHT</h3>
        <div className={styles.spotlight_wrapper}>
          {data?.events?.map((event, index) => (
            <div
              className={styles.spotlight_wrap}
              key={index}
              style={{
                flex: index === 0 ? "1 1 100%" : "1 1 calc(50% - 10px)",
              }}
            >
              <img src={event?.thumbnail} />
              <p className={styles.spotlight_title}>{event?.title}</p>
              <p className={styles.spotlight_subtitle}>{event?.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.banner_container}>
        <img src={require("assets/images/common/banner.jpg")} alt="" />
      </div>
      {/* sale */}
      <div className={styles.clearance_container}>
        <h3 className={styles.section_title}>CLEARANCE</h3>
        <CustomSliderContainer
          setCurrentIndex={setClearanceCurrentIndex}
          settings={{
            infinite: true,
            speed: 500,
            centerMode: true,
            centerPadding: isMobile ? "40px" : "100px",
            slidesToShow: 1,
            slidesToScroll: 1,
          }}
        >
          {data?.clearances?.items?.map((item, index) => {
            const checkIndex = clearanceCurrentIndex == index;
            return (
              <div
                className={classNames({
                  [styles.clearance_item]: true,
                  [styles.clearance_item_disabled]: !checkIndex,
                })}
                key={index}
              >
                <img src={item.thumbnail} />

                <span className={styles.clearance_percent}>
                  {getDiscountPercent(item.price, item.originalPrice)}%
                </span>

                <div className={styles.clearance_item_info}>
                  <p className={styles.brand}>{item?.brandName}</p>
                  <p className={styles.item_name}>{item?.itemName}</p>
                  <p className={styles.price}>
                    {numberWithCommas(item?.price)}원
                  </p>
                </div>
              </div>
            );
          })}
        </CustomSliderContainer>
      </div>

      {/* mark it */}
      <div className={styles.default_selection_container}>
        <h3 className={styles.section_title}>MARK IT</h3>
        <ScrollableSlider>
          {data?.bestItems?.map((item, index) => (
            <ItemCard
              showStatus={true}
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
      {/* brand news */}
      <div className={styles.brand_news_container}>
        <h3 className={styles.section_title}>BRAND NEWS</h3>
        <CustomSliderContainer
          settings={{
            infinite: true,
            speed: 500,
            centerMode: true,
            centerPadding: isMobile ? "15px" : "40px",
            slidesToShow: 1,
            slidesToScroll: 1,
          }}
        >
          {data?.brands.map((brand) => (
            <div className={styles.brand_news_wrapper}>
              <img
                src={brand?.brandThumbnail}
                className={styles.brand_news_thumbnail}
              />
              <div className={styles.brand_info_wrap}>
                <h3 className={styles.brand_name}>{brand?.brandName}</h3>
                <p>{brand?.copyright}</p>
              </div>

              <div className={styles.brands_items_wrapper}>
                {brand?.items.map((item, index) => (
                  <SmallCard item={item} showBrand={false} />
                ))}
              </div>
            </div>
          ))}
        </CustomSliderContainer>
        {/* <BrandNewsContainer brand={data?.brands[0]} />
        <BrandNewsContainer brand={data?.brands[1]} /> */}

        {/* <BrandNewsContainer brand={data?.brands[2]} />
        <BrandNewsContainer brand={data?.brands[3]} /> */}
      </div>
      {/* beauty pick */}
      <div className={styles.default_selection_container}>
        <h3 className={styles.section_title}>BEAUTY CHOICE</h3>
        <ScrollableSlider>
          {data?.mdChoice?.items?.map((item, index) => {
            return (
              <ItemCard
                showStatus={false}
                showOriginalPrice={false}
                item={item}
                style={{
                  height: "270px",
                  flex: "0 0 calc(43% - 10px)",
                }}
              />
            );
          })}
        </ScrollableSlider>
      </div>
      {/* focus */}
      <div className={styles.deep_in_focus_container}>
        <h3 className={styles.section_title}>DEPP IN FOCUS</h3>
        {data?.brandEvents?.slice(0, moreFocus)?.map((brandEvent, index) => (
          <div key={index} className={styles.deep_in_focus_wrapper}>
            <div className={styles.deep_in_focus_thumbnail_wrap}>
              <img
                src={brandEvent?.brandThumbnail}
                className={styles.item_thumbnail}
              />
              <div className={styles.brand_copyright_wrap}>
                <h2>{brandEvent?.brandName}</h2>
                <p>{brandEvent?.copyright}</p>
              </div>
            </div>

            <div className={styles.deep_in_focus_items_wrap}>
              {brandEvent?.items.map((item, index) => (
                <SmallCard key={index} item={item} />
              ))}
            </div>
          </div>
        ))}
        {moreFocus < data?.brandEvents.length && (
          <DefaultButton
            onClick={() => setMoreFocus(moreFocus + 1)}
            label="VIEW MORE +"
          />
        )}
      </div>
      {/* style */}
      <div className={styles.default_selection_container}>
        <h3 className={styles.section_title}>STYLE PICK +</h3>
        <ScrollableSlider>
          {data?.userStyles.map((userStyle, index) => (
            <img
              key={index}
              src={userStyle?.avatar}
              alt=""
              style={{
                height: 150,
                flex: "0 0 calc(23% - 5px)",
                minWidth: 120,
              }}
              className={styles.style_card}
            />
          ))}
        </ScrollableSlider>
      </div>
    </div>
  );
}

function BrandNewsContainer({ brand }) {
  return (
    <div className={styles.brand_news_container}>
      <img
        src={brand?.brandThumbnail}
        className={styles.brand_news_thumbnail}
      />
      <div className={styles.brand_info_wrap}>
        <div>
          <h3>{brand?.brandName}</h3>
          <p>{brand?.copyright}</p>
        </div>
        <ChevronRight />
      </div>
      <ScrollableSlider>
        {brand?.items.map((item, index) => (
          <img
            key={index}
            src={item?.thumbnail}
            alt=""
            className={styles.brand_item}
          />
        ))}
      </ScrollableSlider>
    </div>
  );
}
