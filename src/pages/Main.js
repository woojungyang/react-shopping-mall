import React, { useRef, useState } from "react";

import AppleIcon from "@mui/icons-material/Apple";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShopIcon from "@mui/icons-material/Shop";
import YouTubeIcon from "@mui/icons-material/YouTube";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { DefaultCard, SmallCard } from "components/card";
import { CommonLayout } from "components/common";
import { BestCardsSlider } from "components/slider";

import styles from "styles/_main.module.scss";

export default function Main() {
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 8;
  const progressBarWidth = useRef(null);
  let percentage = (currentIndex / (totalImages - 1)) * 100;

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

  const styleMenu = [
    { id: 1, name: "ALL" },
    { id: 2, name: "WOMAN" },
    { id: 3, name: "MAN" },
    { id: 4, name: "LIFE" },
    { id: 5, name: "BEAUTY" },
  ];
  const [activeStyleCategory, setActiveStyleCategory] = useState(1);

  return (
    <CommonLayout>
      <div className={styles.main_image_container}>
        <div className="slider-container" style={{ position: "relative" }}>
          <Slider
            ref={slider}
            {...settings}
            autoplay
            arrows={false}
            afterChange={(newIndex) => {
              setCurrentIndex(newIndex);
            }}
          >
            {[...new Array(totalImages)].map((e, i) => (
              <img
                key={i}
                src={require(`assets/images/main/main${i + 1}.jpg`)}
                className={styles.main_image}
              />
            ))}
          </Slider>
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
                  width: percentage + "%",
                }}
              ></div>
            </div>
            <p className={styles.slider_index}>{addLeadingZero(totalImages)}</p>
            <div
              className={styles.main_slider_button}
              onClick={() => slider?.current?.slickPrev()}
            >
              <ArrowBackIosNewIcon />
            </div>
            <div
              className={styles.main_slider_button}
              onClick={() => slider?.current?.slickNext()}
            >
              <ArrowForwardIosIcon />
            </div>
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
                  {/* <div className={styles.default_flex}>
                    <DominoPagination />
                    <p className={styles.view_all_button}>View All</p>
                  </div> */}
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
              {[...new Array(3)].map((e, i) => (
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
                  Voluptatibus molestias vitae repellendus doloribus dolore
                  omnis quibusdam, quidem, sunt veniam ratione exercitationem
                  aliquid architecto cupiditate! Odio fugiat minus natus
                  molestiae aliquid. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Autem, placeat reprehenderit, facilis quasi
                  ratione ea repellat non enim repellendus inventore nemo illum
                  ipsum, quo praesentium odit fugiat quod. Temporibus,
                  inventore.
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
              <DefaultCard />
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
              <DefaultCard />
            ))}
          </div>
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
                운영시간 : 평일 09:00 - 17:00 (점심시간: 12:00-13:00 제외)
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
            <div>
              <div>
                <p>NOTICE</p>
                <div>
                  {[...new Array(7)].map((e, i) => (
                    <p>
                      [공지] 서비스 이용약관 개정 안내 (시행일: 2024년 7월 5일)
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div>ABOUT US</div>
                <div>MY ORDER</div>
                <div>MY ACCOUNT</div>
                <div>HELP</div>
              </div>
            </div>
            <div>
              <h6>
                <span>개인정보처리방침</span> | 이용약관
              </h6>
              <p>
                상호명 : 주식회사 우티크 (WOOTIQUE Co., Ltd.) 팩스 :
                010-1233-4444 사업자등록번호 : 000-00-0000
                <br />
                일부 상품의 경우 WOOTIQUE는 통신판매의 당사자가 아닌
                통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수
                있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기
                바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

function SnsWrapper({ children }) {
  return <div className={styles.sns_wrapper}>{children}</div>;
}
