import { enumerate } from "utilities/enumeration";

export const guestMenu = [
  {
    id: 2,
    label: "고객센터",
    category: "cscenter",
    sub: [
      { id: 1, label: "상품 Q&A" },
      { id: 2, label: "1:1문의 내역" },
      { id: 3, label: "공지사항", url: "/mypage/cscenter/notice" },
      { id: 4, label: "FAQ" },
      { id: 5, label: "고객의소리" },
    ],
  },
];
export const userMenuList = [
  {
    id: 1,
    label: "쇼핑정보",
    category: "my-order",
    sub: [
      { id: 1, label: "주문조회", url: "/my-order/my-order-list" },
      { id: 2, label: "상품리뷰" },
    ],
  },
  {
    id: 2,
    label: "회원정보",
    category: "my-info",
    sub: [
      { id: 1, label: "회원정보 수정" },
      { id: 2, label: "멤버십등급" },
      { id: 3, label: "쿠폰" },
      { id: 4, label: "마일리지" },
    ],
  },
].concat(guestMenu);

export const HeartType = enumerate({
  Item: 1,
  Brand: 2,
  Style: 3,
});

export const heartMenu = [
  { id: HeartType.Item, label: "ITEM" },
  { id: HeartType.Brand, label: "BRAND" },
  { id: HeartType.Style, label: "STYLE" },
];
