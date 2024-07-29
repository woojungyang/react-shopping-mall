import React from "react";

import classNames from "classnames";
import { numberWithCommas } from "utilities";

import useQueryString from "hooks/queryString/useQueryString";

import { CommonLayout } from "components/common";

import styles from "styles/_mypage.module.scss";

export default function MyPageContent() {
  const menuList = [
    { id: 1, label: "주문관리" },
    { id: 2, label: "리뷰 작성" },
    { id: 3, label: "상품 Q&A" },
    { id: 4, label: "1:1문의 내역" },
    { id: 5, label: "회원정보 수정" },
    { id: 6, label: "공지사항" },
    { id: 7, label: "고객센터" },
  ];

  const [activeTab, changeActiveTab] = useQueryString(
    "activeTab",
    menuList[0].id,
  );

  const orderStages = [
    { id: 1, label: "주문접수", count: 1 },
    { id: 2, label: "상품준비중", count: 2 },
    { id: 3, label: "배송중", count: 3 },
    { id: 4, label: "배송완료", count: 4 },
  ];
  return (
    <CommonLayout>
      <div className={styles.mypage_container}>
        <p className={styles.mypage_title}>MY PAGE</p>

        <div className={styles.mypage_wrapper}>
          <div className={styles.side_menu_wrap}>
            {/*  <div className={styles.profile_wrapper}>
              <img
                src={require(`assets/images/sub/sub10.jpg`)}
                className={styles.avatar}
              />

              <p className={styles.nickname}>닉네임이들어가는 자님</p>
            </div> */}
            {menuList.map((menu, index) => (
              <p
                onClick={() => {
                  if (menu.id == 1) changeActiveTab(menu.id);
                  else alert("준비중입니다");
                }}
                key={index}
                className={classNames({
                  [styles.menu]: true,
                  [styles.active_tab]: menu.id == activeTab,
                })}
              >
                {menu.label}
              </p>
            ))}
          </div>
          <div className={styles.content_wrap}>
            {activeTab == menuList[0].id && (
              <div className={styles.order_wrapper}>
                <p>이달의 주문내역</p>
                <div className={styles.order_stages}>
                  {orderStages.map((stage, index) => (
                    <div key={index} className={styles.stage}>
                      <p className={styles.order_count}>
                        {numberWithCommas(stage.count)}
                      </p>
                      <p className={styles.order_label}>{stage.label}</p>
                    </div>
                  ))}
                </div>
                <div>
                  테이블을 넣을꺼ㅏ
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
