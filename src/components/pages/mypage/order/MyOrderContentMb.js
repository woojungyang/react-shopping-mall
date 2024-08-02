import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { numberWithCommas } from "utilities";

import { MobileLayout } from "components/common";

import styles from "styles/_mypage.module.scss";

export default function MyOrderContentMb() {
  const orderStages = [
    { id: 1, label: "주문접수", count: 1 },
    { id: 2, label: "상품준비중", count: 2 },
    { id: 3, label: "배송중", count: 3 },
    { id: 4, label: "배송완료", count: 4 },
  ];

  const menuList = [
    { id: 1, label: "주문관리" },
    { id: 2, label: "리뷰 작성" },
    { id: 3, label: "상품 Q&A" },
    { id: 4, label: "1:1문의 내역" },
    { id: 5, label: "공지사항" },
    { id: 6, label: "고객센터" },
  ];
  return (
    <MobileLayout
      headerTitle="MY PAGE"
      isBottomNavigation={true}
      isFooter={true}
    >
      <div className={styles.mobile_mypage_container}>ddd</div>
    </MobileLayout>
  );
}
