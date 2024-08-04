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

  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);

  console.log(selectedMenu);

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
            {menuList.map((menu, index) => {
              const isActive = menu.url == pathname || menu.url == "/mypage";
              const hasSubMenu = menu?.sub?.length;
              return (
                <div
                  onClick={() => {
                    if (menu.id < 3 && !hasSubMenu) navigation(menu.url);
                    else if (!!hasSubMenu) {
                      setShowMenu(!showMenu);
                      if (selectedMenu.length) setSelectedMenu([]);
                      else setSelectedMenu(menu);
                    } else alert("준비중입니다.");
                  }}
                  key={index}
                >
                  <div
                    className={classNames({
                      [styles.menu]: true,
                      [styles.active_tab]: isActive,
                    })}
                    style={{
                      marginBottom:
                        showMenu && menu.id == selectedMenu.id ? 0 : "none",
                    }}
                  >
                    <p>{menu.label}</p>
                    {isActive && <TrendingFlatIcon />}
                  </div>
                  {showMenu && menu.id == selectedMenu.id && (
                    <div className={styles.sub_menu_wrap}>
                      {selectedMenu.sub.map((menu2) => (
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            setToastMessage("준비중입니다.");
                          }}
                        >
                          {menu2.label}
                        </p>
                      ))}
                    </div>
                  )}
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
  { id: 2, label: "상품 리뷰", url: "/mypage/review" },
  { id: 3, label: "상품 Q&A" },
  { id: 4, label: "1:1문의 내역" },
  {
    id: 5,
    label: "회원정보",
    sub: [
      { id: 1, label: "회원정보 수정" },
      { id: 1, label: "멤버십등급" },
      { id: 1, label: "쿠폰" },
      { id: 1, label: "마일리지" },
    ],
  },
  { id: 6, label: "공지사항" },
  { id: 7, label: "고객센터" },
];

const membershipInformation = [
  { label: "회원등급", content: "Green", className: styles.membership_wrap1 },
  { label: "쿠폰", content: 2 },
  { label: "마일리지", content: "0" },
];
