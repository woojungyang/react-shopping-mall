import React, { useEffect, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EastIcon from "@mui/icons-material/East";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { CommonLayout } from "components/common";
import { ToastModal } from "components/modal";

import styles from "styles/_mypage.module.scss";

export const MyPageLayout = ({ children }) => {
  const navigation = useNavigate();
  const pathname = window.location.pathname;

  const [toastMessage, setToastMessage] = useState("");

  return (
    <CommonLayout>
      <div className={styles.mypage_container}>
        <p className={styles.mypage_title}>마이페이지</p>

        <div className={styles.profile_wrapper}>
          {membershipInformation.map((membership, index) => (
            <div
              onClick={() => setToastMessage("준비중입니다.")}
              key={index}
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
            {menuList.map((menu, index) => {
              const isActive = menu.url == pathname || menu.url == "/mypage";
              return (
                <div
                  onClick={() => {
                    if (menu.id < 3) navigation(menu.url);
                    else alert("준비중입니다");
                  }}
                  key={index}
                  className={classNames({
                    [styles.menu]: true,
                    [styles.active_tab]: isActive,
                  })}
                >
                  <p>{menu.label}</p>
                  {isActive && <TrendingFlatIcon />}
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

const menuList = [
  { id: 1, label: "주문관리", url: "/mypage" },
  { id: 2, label: "리뷰 작성", url: "/mypage/review" },
  { id: 3, label: "상품 Q&A" },
  { id: 4, label: "1:1문의 내역" },
  { id: 5, label: "회원정보 수정" },
  { id: 6, label: "공지사항" },
  { id: 7, label: "고객센터" },
];

const membershipInformation = [
  { label: "회원등급", content: "Green", className: styles.membership_wrap1 },
  { label: "쿠폰", content: 2 },
  { label: "마일리지", content: "0" },
];
