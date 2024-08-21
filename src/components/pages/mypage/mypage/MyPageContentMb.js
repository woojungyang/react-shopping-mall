import React, { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mypageMenuList } from "models/mypage";
import { OrderState } from "models/order";
import { MembershipRank, getMembershipLabel } from "models/user";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import { LikeHeart } from "components/card";
import { MobileLayout } from "components/common";
import { ToastModal } from "components/modal";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function MyPageContentMb() {
  const navigation = useNavigate();

  const [toastMessage, setToastMessage] = useState("");

  const count = 777;

  return (
    <MobileLayout
      headerTitle="마이페이지"
      isBottomNavigation={true}
      isFooter={true}
      currentTab="/mypage"
    >
      <div className={styles.mobile_mypage_container}>
        <div className={styles.profile_wrapper}>
          <p className={styles.profile_name}>홍길동</p>
          <div className={styles.like_wrap}>
            <LikeHeart
              readOnly={true}
              position={{ position: "relative" }}
              onClick={() => setToastMessage("준비중입니다.")}
            />

            <p>{count > 998 ? "+999" : count}</p>
          </div>
        </div>

        <Membership
          content={{
            title: "멤버십 등급",
            content: getMembershipLabel(MembershipRank.Basic),
          }}
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
              {menu.sub.map((menu2) => {
                const orderLabel = menu2.label == "주문조회";
                return (
                  <>
                    <p
                      onClick={(e) => {
                        if (!!menu2.url) navigation(menu2.url);
                        else setToastMessage("준비중입니다.");
                      }}
                      style={{ borderWidth: orderLabel ? 0 : "none" }}
                      className={styles.sub_menu}
                    >
                      {menu2.label}
                      <ArrowForwardIosIcon />
                    </p>
                    {orderLabel && (
                      <div className={styles.order_stages}>
                        <div className={styles.order_stage_wrap}>
                          {orderStages.map((stage, index) => (
                            <div key={index} className={styles.stage}>
                              <p
                                className={styles.order_count}
                                onClick={() => {
                                  navigation(
                                    `${menu2.url}?selectedOrderState=${stage.id}&startDate=${formatDateTime(addMonths(now(), -3))}`,
                                  );
                                }}
                              >
                                {numberWithCommas(stage.count)}
                              </p>
                              <p className={styles.order_label}>
                                {stage.label}
                              </p>
                              {index + 1 != orderStages.length && (
                                <ChevronRightIcon />
                              )}
                            </div>
                          ))}
                        </div>
                        <p className={styles.order_title}>
                          <span>(최근 3개월)</span>
                        </p>
                      </div>
                    )}
                  </>
                );
              })}
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

const orderStages = [
  { id: OrderState.PendingPayment, label: "결제대기", count: 1 },
  { id: OrderState.ConfirmedOrder, label: "주문접수", count: 1 },
  { id: OrderState.Preparing, label: "상품준비중", count: 2 },
  { id: OrderState.Delivery, label: "배송중", count: 3 },
  { id: OrderState.CompletedDelivery, label: "배송완료", count: 4 },
];
