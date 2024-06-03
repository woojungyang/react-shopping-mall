import React, { Fragment, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { CommonLayout, LikePin } from 'components/common';
import styles from 'styles/_main.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import { BestCardsSlider } from 'components/slider';
import classNames from 'classnames';
import { DefaultCard, SmallCard } from 'components/card';
import { numberWithCommas } from 'utilities';

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
    return number.toString().padStart(2, '0');
  }

  const dummyMenu = [
    { id: 1, name: 'BEST' },
    { id: 2, name: 'NEW' },
    { id: 3, name: 'ZOOM' },
    { id: 4, name: 'SALE' },
  ];

  const [activeBrand, setActiveBrand] = useState(0);

  return (
    <CommonLayout>
      <div className={styles.main_image_container}>
        <div className="slider-container" style={{ position: 'relative' }}>
          <Slider
            ref={slider}
            {...settings}
            autoplay
            arrows={false}
            afterChange={newIndex => {
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
            <p className={styles.slider_index}>{addLeadingZero(currentIndex + 1)}</p>
            <div style={{ position: 'relative' }}>
              <div className={styles.main_slider_bottom}></div>
              <div
                className={styles.main_slider_percent}
                ref={progressBarWidth}
                style={{
                  width: percentage + '%',
                }}
              ></div>
            </div>
            <p className={styles.slider_index}>{addLeadingZero(totalImages)}</p>
            <div className={styles.main_slider_button} onClick={() => slider?.current?.slickPrev()}>
              <ArrowBackIosNewIcon />
            </div>
            <div className={styles.main_slider_button} onClick={() => slider?.current?.slickNext()}>
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
        <div className={styles.items_contents_container}>
          <div className={styles.items_contents_wrapper}>
            <div className={styles.item_category_wrapper}>
              {dummyMenu.map((e, i) => (
                <div className={styles.item_category}>
                  <Link to={'#'}>{e.name} </Link>
                  <span>{i + 1 != dummyMenu?.length && '|'}</span>
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
                  src={require('assets/images/sub/sub24.jpg')}
                  className={styles.item_thumbnail}
                />
                <div style={{ padding: '16px' }}>
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
          <div className={classNames(styles.default_flex, styles.collection_description_wrapper)}>
            <div className={styles.collection_description}>
              <h3 className={styles.collection_title}>COLLABORATION ITEMS NEWS</h3>

              <div className={styles.collection_title_box}></div>
              <p className={styles.collection_description}>
                Voluptatibus molestias vitae repellendus doloribus dolore omnis quibusdam, quidem,
                sunt veniam ratione exercitationem aliquid architecto cupiditate! Odio fugiat minus
                natus molestiae aliquid. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Autem, placeat reprehenderit, facilis quasi ratione ea repellat non enim repellendus
                inventore nemo illum ipsum, quo praesentium odit fugiat quod. Temporibus, inventore.
              </p>
            </div>
            <div className={styles.more_items}>
              <img src={require('assets/images/sub/sub24.jpg')} />
              <img src={require('assets/images/sub/sub24.jpg')} />
              <img src={require('assets/images/sub/sub24.jpg')} />
            </div>
          </div>
        </div>
        <div className={styles.magazine_container}>
          {[...new Array(4)].map((e, i) => (
            <DefaultCard />
          ))}
        </div>
        <div className={styles.event_banner_wrapper}>event banner</div>

        <div className={styles.brand_container}>
          <h4 className={styles.section_title}>BRAND</h4>
          <div className={styles.brand_wrapper}>
            {[...new Array(3)].map((e, i) => {
              const active = activeBrand == i;
              return (
                <div
                  className={classNames({
                    [styles.brand_wrap]: true,
                    [styles.default_flex]: active,
                    [styles.brand_disabled]: !active,
                  })}
                  onClick={() => setActiveBrand(i)}
                >
                  <img
                    className={styles.brand_thumbnail}
                    src={require(`assets/images/sub/sub2${i}.jpg`)}
                  />
                  {!active && <div className={styles.image_overlay}>BrandName</div>}
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
      </div>
    </CommonLayout>
  );
}
