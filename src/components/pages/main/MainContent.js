import React, { useMemo, useRef, useState } from "react";

import AppleIcon from "@mui/icons-material/Apple";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShopIcon from "@mui/icons-material/Shop";
import YouTubeIcon from "@mui/icons-material/YouTube";
import classNames from "classnames";
import { Device } from "models/device";
import { Link } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import { PhotoCard, SmallCard } from "components/card";
import { BestCardsSlider, ImageSlider } from "components/slider";

import { calculatePercent } from "utilities/calculatePercent";

import styles from "styles/_main.module.scss";

export default function MainContent() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 8;
  const progressBarWidth = useRef(null);

  function addLeadingZero(number) {
    return number.toString().padStart(2, "0");
  }

  const dummyMenu = [
    { id: 1, name: "BEST" },
    { id: 2, name: "NEW" },
    { id: 3, name: "ZOOM" },
    { id: 4, name: "SALE" },
  ];

  const [activeBrand, setActiveBrand] = useState(0);
  const [brands, setBrands] = useState([...new Array(3)]);

  const hotKeywords = useMemo(() => [...new Array(3)], [isDeskTop]);

  const styleMenu = [
    { id: 1, name: "ALL" },
    { id: 2, name: "WOMAN" },
    { id: 3, name: "MAN" },
    { id: 4, name: "LIFE" },
    { id: 5, name: "BEAUTY" },
  ];
  const [activeStyleCategory, setActiveStyleCategory] = useState(1);
  return (
    <div className={styles.main_image_container}>
      <div className="slider-container" style={{ position: "relative" }}>
        <ImageSlider
          images={[...new Array(totalImages)]}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className={styles.main_slider_wrapper}>
          <p className={styles.slider_index}>
            {addLeadingZero(currentIndex + 1)}
          </p>
          <div style={{ position: "relative" }}>
            <div className={styles.main_slider_bottom}></div>
            <div
              className={styles.main_slider_percent}
              ref={progressBarWidth}
              style={{
                width: calculatePercent(currentIndex, totalImages) + "%",
              }}
            ></div>
          </div>
          <p className={styles.slider_index}>{addLeadingZero(totalImages)}</p>
        </div>
      </div>
      <div className={styles.main_content_container}>
        <div className={styles.items_contents_container}>
          <div className={styles.items_contents_wrapper}>
            <div className={styles.item_category_wrapper}>
              {dummyMenu.map((e, i) => (
                <div className={styles.item_category}>
                  <Link to={"#"}>{e.name} </Link>
                  <span>{i + 1 != dummyMenu?.length && "|"}</span>
                </div>
              ))}
            </div>
            <div className={styles.second_slider_container}>
              <div className={styles.slider_subtitle_wrapper}>
                <h4 className={styles.section_title}>WHAT'S BEST</h4>
                <div className={styles.default_flex}>
                  {/* <DominoPaginatio /> */}
                  {/* <p className={styles.view_all_button}>View All</p> */}
                </div>
              </div>
              <BestCardsSlider />
            </div>
          </div>
        </div>
        <div className={styles.gallery_container}>
          <h4 className={styles.section_title}>HOT KEYWORD</h4>

          <div className={styles.gallery}>
            <div className={styles.large_img}>#버킷햇</div>
            <div className={styles.small_img}>
              <div>#나시</div>
              <div>#원피스</div>
            </div>
            <div className={styles.large_img}>#샌들</div>
            <div className={styles.small_img}>
              <div>#플레따</div>
              <div>#에코백</div>
            </div>
          </div>

          <div className={styles.selected_keyword_item_wrapper}>
            {hotKeywords.map((e, i) => (
              <div className={styles.selected_keyword_item_wrap}>
                <img
                  src={require("assets/images/sub/sub24.jpg")}
                  className={styles.item_thumbnail}
                />
                <div style={{ padding: "16px" }}>
                  {[...new Array(3)].map((e2, i) => (
                    <SmallCard />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.collection_container}>
          <h4 className={styles.section_title}>STYLE STORY</h4>
          <div className={styles.collection_img_wrapper}>
            <div className={styles.first_img}>사진1</div>
          </div>
          <div
            className={classNames(
              styles.default_flex,
              styles.collection_description_wrapper,
            )}
          >
            <div className={styles.collection_description}>
              <h3 className={styles.collection_title}>
                COLLABORATION ITEMS NEWS
              </h3>

              <div className={styles.collection_title_box}></div>
              <p className={styles.collection_description}>
                Voluptatibus molestias vitae repellendus doloribus dolore omnis
                quibusdam, quidem, sunt veniam ratione exercitationem aliquid
                architecto cupiditate! Odio fugiat minus natus molestiae
                aliquid. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Autem, placeat reprehenderit, facilis quasi ratione ea
                repellat non enim repellendus inventore nemo illum ipsum, quo
                praesentium odit fugiat quod. Temporibus, inventore.
              </p>
            </div>

            <div className={styles.more_items}>
              <img src={require("assets/images/sub/sub24.jpg")} />
              <img src={require("assets/images/sub/sub24.jpg")} />
              <img src={require("assets/images/sub/sub24.jpg")} />
            </div>
          </div>
        </div>
        <div className={styles.magazine_container}>
          {[...new Array(4)].map((e, i) => (
            <PhotoCard />
          ))}
        </div>
      </div>

      <div className={styles.event_banner_wrapper}>event banner</div>
      <div className={styles.main_content_container}>
        <div className={styles.brand_container}>
          <h4 className={styles.section_title}>BRAND</h4>
          <div className={styles.brand_wrapper}>
            {brands.map((item, index) => {
              const active = activeBrand == index;
              const isMiddle = index !== 0 && index !== brands.length;
              return (
                <div
                  className={classNames({
                    [styles.brand_wrap]: true,
                    [styles.default_flex]: active,
                    [styles.brand_disabled]: !active,
                  })}
                  style={{ marginLeft: isMiddle && active ? 16 : 0 }}
                  onClick={() => setActiveBrand(index)}
                  onMouseOver={() => setActiveBrand(index)}
                >
                  <img
                    className={styles.brand_thumbnail}
                    src={require(`assets/images/sub/sub2${index}.jpg`)}
                  />
                  {!active && (
                    <div className={styles.image_overlay}>BrandName</div>
                  )}
                  {active && (
                    <div className={styles.items_list_wrapper}>
                      {[...new Array(4)].map((e, i) => (
                        <SmallCard />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.event_container}>
          {[...new Array(3)].map((e, i) => (
            <PhotoCard />
          ))}
        </div>
        <h4 className={styles.section_title}> STYLE</h4>
        <div className={styles.style_container}>
          <div className={styles.style_menu_wrapper}>
            {styleMenu.map((e) => (
              <p
                onClick={() => setActiveStyleCategory(e.id)}
                className={classNames({
                  [styles.style_menu]: true,
                  [styles.active_style_menu]: activeStyleCategory == e.id,
                })}
              >
                {e.name}
              </p>
            ))}
          </div>

          <div className={styles.style_image_wrapper}>
            {[...new Array(6)].map((e, i) => (
              <div className={styles.image_wrap}>
                <img
                  src={require("assets/images/sub/sub11.jpg")}
                  className={styles.style_image}
                />
                <p className={styles.user_name}>@user_name</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.notice_container}>
          <div className={styles.information_wrapper}>
            <h4 className={styles.information_title}>
              SERVICE CENTER 2015-0907
            </h4>
            <p className={styles.information_subtitle}>
              MON - FRI 09 : 00 - 18:00 | 주말, 공휴일 휴무 | BREAK TIME : 12:30
              - 13:30
              <br />
              cs_help@wootique.co.kr
            </p>
            <div className={styles.information_button_wrapper}>
              <div>
                <button className={styles.information_button}>FAQ</button>
                <button className={styles.information_button}>1:1문의</button>
              </div>
              <div className={styles.default_flex}>
                <SnsWrapper>
                  <InstagramIcon className={styles.sns_icon} />
                </SnsWrapper>
                <SnsWrapper>
                  <YouTubeIcon className={styles.sns_icon} />
                </SnsWrapper>
                <SnsWrapper>
                  <AppleIcon className={styles.sns_icon} />
                </SnsWrapper>
                <SnsWrapper>
                  <ShopIcon className={styles.sns_icon} />
                </SnsWrapper>
              </div>
            </div>
          </div>
          <div className={styles.default_flex_space}>
            <div className={styles.notice_wrapper}>
              <p className={styles.notice_title}>NOTICE</p>
              <div>
                {[...new Array(7)].map((e, i) => (
                  <div className={styles.default_flex_space}>
                    <p className={styles.notice_content_title}>
                      [공지] 서비스 이용약관 개정 안내 (시행일: 2024년 7월 5일)
                    </p>
                    <p
                      className={styles.notice_content_title}
                      style={{ flexShrink: 0, marginLeft: 20 }}
                    >
                      2024-07-11
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bottom_navigation_wrapper}>
              <div className={styles.bottom_navigation_item}>
                <p>ABOUT US</p>
                <p>WOOTIQUE 소개</p>
                <p>SITE MAP</p>
              </div>
              <div className={styles.bottom_navigation_item}>
                <p>MY ORDER</p>
                <p>주문 배송</p>
                <p>상품 리뷰 내역</p>
              </div>
              <div className={styles.bottom_navigation_item}>
                <p>NEED HELP</p>
                <p>1:1문의 내역</p>
                <p>주문 문의</p>
                <p>FQA</p>
                <p>공지사항</p>
                <p>고객의 소리</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SnsWrapper({ children }) {
  return <div className={styles.sns_wrapper}>{children}</div>;
}
