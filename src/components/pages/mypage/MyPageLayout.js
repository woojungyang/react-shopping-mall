import React, { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { mypageMenuList } from "models/mypage";
import { useNavigate } from "react-router-dom";

import { CommonLayout } from "components/common";
import { ToastModal } from "components/modal";

import styles from "styles/_mypage.module.scss";

export const MyPageLayout = ({ children }) => {
  const navigation = useNavigate();
  const pathname = window.location.pathname;
  const menuCategory = pathname.split("/")[1];

  const [toastMessage, setToastMessage] = useState("");

  return (
    <CommonLayout>
      <div className={styles.mypage_container}>
        <p className={styles.mypage_title}>마이페이지</p>

        <div className={styles.profile_wrapper}>
          {membershipInformation.map((membership, index) => (
            <div
              key={index}
              onClick={() => setToastMessage("준비중입니다.")}
              className={membership.className || styles.membership_wrap2}
            >
              <p className={styles.membership_title}>
                {membership.label} <ChevronRightIcon />
              </p>
              <p className={styles.membership_count}>{membership.content}</p>
            </div>
          ))}
        </div>
        <div className={styles.mypage_wrapper}>
          <div className={styles.side_menu_wrap}>
            {mypageMenuList.map((menu, index) => {
              const isActive = menu.category == menuCategory;
              const hasSubMenu = menu?.sub?.length;
              return (
                <div key={index}>
                  <div
                    className={classNames({
                      [styles.menu]: true,
                      [styles.active_tab]: isActive,
                    })}
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
                            [styles.active_tab]: menu2?.url == pathname,
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
  { label: "회원등급", content: "Green", className: styles.membership_wrap1 },
  { label: "쿠폰", content: 2 },
  { label: "마일리지", content: "0" },
];
