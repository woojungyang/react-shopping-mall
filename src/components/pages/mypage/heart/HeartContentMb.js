import React, { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classNames from "classnames";
import { HeartType, heartMenu } from "models/mypage";
import { useQueryClient } from "react-query";

import useDeleteLikeMutation from "hooks/mutation/useDeleteLikeMutation";
import useLikesQuery from "hooks/query/useLikesQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";

import { LikeHeart } from "components/card";
import { DefaultCheckbox, DefaultPagination } from "components/common";
import { LoadingLayer, MobileLayout } from "components/common";
import { ToastModal } from "components/modal";
import { ScrollableSlider } from "components/slider";

import styles from "styles/_mypage.module.scss";

import { HeartCard } from "./HeartCard";

export default function HeartContentMb() {
  const queryClient = useQueryClient();

  const [toastMessage, setToastMessage] = useState("");

  const [excludingSoldOut, setExcludingSoldOut] = useState(false);

  const [currentTab, changeCurrentTab] = useQueryString(
    "currentTab",
    HeartType.Item,
  );

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 10);
  const handleChangePage = (_event, page) => changePage(page);
  const {
    data: likes,
    isLoading,
    isFetching,
  } = useLikesQuery({
    type: currentTab,
    limit: limit,
    offset: offset,
    excludingSoldOut: excludingSoldOut,
  });

  const [selectedElementId, setSelectedElementId] = useState("");

  const deleteLikeMutation = useDeleteLikeMutation(selectedElementId);
  async function requestDeleteLikeItem() {
    try {
      deleteLikeMutation.mutateAsync({
        type: currentTab,
      });
      setSelectedElementId("");
      queryClient.refetchQueries([`/api/v1/likes`, { type: currentTab }]);
    } catch (err) {
      setToastMessage(err.message);
    }
  }

  useEffect(() => {
    if (!!selectedElementId) requestDeleteLikeItem();
  }, [selectedElementId]);
  useEffect(() => {
    changePage(1);
  }, [currentTab]);

  if (isLoading || isFetching || deleteLikeMutation.isLoading)
    return <LoadingLayer />;

  return (
    <MobileLayout
      headerTitle="♡ HEART"
      isFooter={true}
      isBottomNavigation={true}
    >
      <div className={styles.my_heart_container_mobile}>
        <div className={styles.heart_filter_wrapper}>
          {heartMenu.map((menu, index) => (
            <p
              className={classNames({
                [styles.heart_filter]: true,
                [styles.heart_filter_active]: currentTab == menu.id,
              })}
              key={index}
              onClick={() => changeCurrentTab(menu.id)}
            >
              {currentTab == menu.id ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
              MY {menu.label}
            </p>
          ))}
        </div>
        {HeartType.Item == currentTab && likes?.total > 0 && (
          <div style={{ padding: "0 16px" }}>
            <div className={styles.heart_items_filter_mobile}>
              <div className={styles.excluding_wrap}>
                <DefaultCheckbox
                  checked={excludingSoldOut}
                  onChange={() => setExcludingSoldOut(!excludingSoldOut)}
                  size="20px"
                />
                <span>품절제외</span>
              </div>
            </div>
            <div
              className={classNames({
                [styles.heart_items_wrapper_mobile]: true,
              })}
            >
              {likes?.data?.map((item, index) => (
                <HeartCard isExpansion={false} item={item} key={index} />
              ))}
            </div>
          </div>
        )}
        {HeartType.Brand == currentTab && likes?.total > 0 && (
          <div className={styles.brand_wrapper}>
            {likes.data.map((brand, index) => (
              <div className={styles.brand_wrap} key={index}>
                <div className={styles.brand_header}>
                  <div className={styles.brand_name_wrap}>
                    <LikeHeart
                      position={{
                        position: "relative",
                        width: "20px",
                        height: "20px",
                        top: "-2px",
                      }}
                      defaultColor="skeleton"
                      like={true}
                      onClick={() => setSelectedElementId(brand.id)}
                    />
                    <p>{brand.name}</p>
                  </div>
                  <p
                    className={styles.more_button}
                    onClick={() => setToastMessage("준비중입니다.")}
                  >
                    MORE
                  </p>
                </div>
                <ScrollableSlider>
                  {brand.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        height: 300,
                        flex: "0 0 calc(45% - 10px)",

                        marginRight: 10,
                      }}
                    >
                      <HeartCard item={item} showButton={false} />
                    </div>
                  ))}
                </ScrollableSlider>
              </div>
            ))}
          </div>
        )}
        {HeartType.Style == currentTab && likes?.total > 0 && (
          <div
            className={styles.heart_items_wrapper_mobile}
            style={{ padding: "20px 16px 0px 16px" }}
          >
            {likes?.data?.map((style, index) => (
              <div className={styles.style_wrap} key={index}>
                <img src={style.avatar} />
                <LikeHeart
                  like={true}
                  position={{ right: "5%", top: "5%" }}
                  onClick={() => setSelectedElementId(style.id)}
                />
                <p>@{style.username.split("@")[0]}</p>
              </div>
            ))}
          </div>
        )}

        {!likes?.total && (
          <div className={styles.empty_heart_wrap}>
            <p className={styles.empty_title}>
              MY {heartMenu.find((e) => e.id == currentTab).label}에 <br />
              저장된 내역이 없습니다.
            </p>
            <p className={styles.empty_subtitle}>
              관심있는 컨텐츠를 <FavoriteBorderIcon />
              HEART에 <br />
              저장 해두시면 한곳에 모아 보실 수 있습니다.
            </p>
          </div>
        )}
        {likes?.total > 0 && (
          <DefaultPagination
            count={getPageCount(likes?.total)}
            page={page}
            onChange={handleChangePage}
          />
        )}
        {toastMessage && (
          <ToastModal
            toastMessage={toastMessage}
            setToastMessage={setToastMessage}
          />
        )}
      </div>
    </MobileLayout>
  );
}
