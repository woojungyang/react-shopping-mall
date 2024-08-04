import React, { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mypageMenuList } from "models/mypage";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import { MobileLayout } from "components/common";
import { ToastModal } from "components/modal";

import styles from "styles/_mypage.module.scss";

export default function MyPageContentMb() {
  const navigation = useNavigate();

  const [toastMessage, setToastMessage] = useState("");

  return (
    <MobileLayout
      headerTitle="마이페이지"
      isBottomNavigation={true}
      isFooter={true}
      currentTab="/mypage"
    >
      <div className={styles.mobile_mypage_container}>
        <div className={styles.profile_wrapper}></div>
        <Membership
          content={{ title: "멤버십 등급", content: "GREEN" }}
          setToastMessage={setToastMessage}
        />
        <div className={styles.double_membership_wrap}>
          <Membership
            content={{ title: "쿠폰", content: 1 }}
            setToastMessage={setToastMessage}
          />
          <Membership
            content={{ title: "마일리지", content: 3 }}
            setToastMessage={setToastMessage}
          />
        </div>

        <div className={styles.menu_wrapper}>
          {mypageMenuList.map((menu, index) => (
            <div key={index} className={styles.menu}>
              <p className={styles.menu_category}>{menu.label} </p>
              {menu.sub.map((menu2) => (
                <p
                  onClick={(e) => {
                    if (!!menu2.url) navigation(menu2.url);
                    else setToastMessage("준비중입니다.");
                  }}
                  className={styles.sub_menu}
                >
                  {menu2.label}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ToastModal
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </MobileLayout>
  );
}

function Membership({ content, setToastMessage }) {
  return (
    <div
      className={styles.membership_wrap}
      onClick={() => setToastMessage("준비중입니다.")}
    >
      <p className={styles.membership_title}>{content?.title}</p>
      <p className={styles.membership_count}>{content?.content}</p>
    </div>
  );
}
