import React from "react";

import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { CommonLayout } from "components/common";

import styles from "styles/_mypage.module.scss";

export const MyPageLayout = ({ children }) => {
  const navigation = useNavigate();
  const pathname = window.location.pathname;

  return (
    <CommonLayout>
      <div className={styles.mypage_container}>
        <p className={styles.mypage_title}>MY PAGE</p>

        <div className={styles.mypage_wrapper}>
          <div className={styles.side_menu_wrap}>
            {menuList.map((menu, index) => (
              <p
                onClick={() => {
                  if (menu.id < 3) navigation(menu.url);
                  else alert("준비중입니다");
                }}
                key={index}
                className={classNames({
                  [styles.menu]: true,
                  [styles.active_tab]: menu.url == pathname,
                })}
              >
                {menu.label}
              </p>
            ))}
          </div>
          <div className={styles.content_wrap}>{children}</div>
        </div>
      </div>
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
