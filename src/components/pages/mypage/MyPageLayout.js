import React, { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { guestMenu, userMenuList } from "models/mypage";
import { getMembershipLabel } from "models/user";
import { useNavigate, useParams } from "react-router-dom";

import useUserQuery from "hooks/query/useUserQuery";

import { CommonLayout } from "components/common";
import { ToastModal } from "components/modal";

import styles from "styles/_mypage.module.scss";

export const MyPageLayout = ({ children, childrenLoading = false }) => {
  const navigation = useNavigate();
  const pathname = window.location.pathname;
  const menuCategory = pathname.split("/mypage")[1].split("/")[1];

  const { id } = useParams();

  const [toastMessage, setToastMessage] = useState("");

  const token = localStorage.getItem("token");
  const { data: user, isLoading } = useUserQuery({ enabled: !!token });

  const menuList = !!token ? userMenuList : guestMenu;

  return (
    <CommonLayout isLoading={isLoading || childrenLoading}>
      <div className={styles.mypage_container}>
        {!!token && (
          <>
            <p className={styles.mypage_title}>MY PAGE</p>
            <div className={styles.profile_wrapper}>
              {membershipInformation.map((membership, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!!membership?.link) navigation(membership.link);
                    else setToastMessage("준비중입니다.");
                  }}
                  className={membership.className || styles.membership_wrap2}
                >
                  <p className={styles.membership_title}>
                    {membership.label} <ChevronRightIcon />
                  </p>
                  <p className={styles.membership_count}>
                    {membership.key == "rank"
                      ? getMembershipLabel(user?.rank)
                      : user?.[membership.key]}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className={styles.mypage_wrapper}>
          <div className={styles.side_menu_wrap}>
            {!!token && (
              <div className={styles.user_information}>
                <p className={styles.user_name}>{user?.name}</p>
                <p
                  className={styles.heart_wrap}
                  onClick={() => navigation("/mypage/heart")}
                >
                  <FavoriteBorderIcon />
                  HEART
                </p>
              </div>
            )}
            {menuList.map((menu, index) => {
              const isActive = menu.category == menuCategory;

              const hasSubMenu = menu?.sub?.length;
              return (
                <div key={index}>
                  <div
                    className={classNames({
                      [styles.menu]: true,
                      [styles.active_tab]: isActive,
                    })}
                    onClick={() => {
                      if (menu.label == "쇼핑정보") navigation("/mypage");
                    }}
                    style={{
                      marginBottom: hasSubMenu ? 0 : "none",
                    }}
                  >
                    <p>{menu.label}</p>
                    {isActive && <TrendingFlatIcon />}
                  </div>
                  <div className={styles.sub_menu_wrap}>
                    {hasSubMenu &&
                      menu.sub.map((menu2, index2) => (
                        <p
                          key={index2}
                          onClick={(e) => {
                            if (!!menu2.url) navigation(menu2.url);
                            else setToastMessage("준비중입니다.");
                          }}
                          className={classNames({
                            [styles.active_tab]:
                              menu2?.url == pathname.replace(`/${id}`, ""),
                          })}
                        >
                          {menu2.label}
                        </p>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.content_wrap}>{children}</div>
        </div>
      </div>
      <ToastModal
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </CommonLayout>
  );
};

const membershipInformation = [
  {
    label: "회원등급",
    className: styles.membership_wrap1,
    key: "rank",
  },
  { label: "쿠폰", key: "couponCount" },
  { label: "마일리지", key: "mileage" },
];
