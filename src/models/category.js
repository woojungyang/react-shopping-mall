import { enumerate } from "utilities/enumeration";

export const filterList = [
  { label: "신상품순", sort: "new" },
  { label: "판매순", sort: "sale" },
  { label: "낮은가격순", sort: "lowPrice" },
  { label: "높은가격순", sort: "heighPrice" },
];

export const categoryList = ["women", "men", "kid", "life", "beauty"];

export function getSubCategory(categoryName) {
  const commonApparel = [
    { id: 0, label: "ALL", sub: "전체" },
    { id: 1, label: "Outer", sub: "아우터" },
    { id: 2, label: "Knitwear", sub: "니트" },
    { id: 3, label: "T-shirts", sub: "티셔츠" },
    { id: 4, label: "Sweats/Hoodies", sub: "스웨트 셔츠/후디" },
    { id: 5, label: "Pants", sub: "팬츠" },
    { id: 8, label: "Loungewear", sub: "라운지웨어" },
  ];

  const womenApparel = commonApparel
    .concat([
      { id: 6, label: "Skirt", sub: "스커트" },
      { id: 7, label: "One-piece", sub: "원피스" },
    ])
    .sort((a, b) => b.id - a.id);

  const commonShoes = [
    { id: 0, label: "ALL", sub: "전체" },
    { id: 1, label: "Boots", sub: "부츠" },
    { id: 2, label: "Sneakers", sub: "스니커즈" },
    { id: 3, label: "Loafers", sub: "로퍼" },
    { id: 5, label: "Sandals", sub: "샌들" },
    { id: 6, label: "Slipper", sub: "슬리퍼" },
    { id: 10, label: "Shoes acc", sub: "기타 슈즈" },
  ];

  const womenShoes = [{ id: 4, label: "Pumps/Heals", sub: "펌프/힐" }]
    .concat(commonShoes)
    .sort((a, b) => b.id - a.id);

  const menShoes = [{ id: 7, label: "Lace-up", sub: "레이스업" }]
    .concat(commonShoes)
    .sort((a, b) => b.id - a.id);

  if (!categoryName) return [];

  if (["women", "men", "kid"].includes(categoryName)) {
    return [
      { id: 1, label: "ALL", sub: "전체" },
      {
        id: 2,
        label: "CLOTHING",
        sub: "의류",
        depth: categoryName === "men" ? commonApparel : womenApparel,
      },
      {
        id: 3,
        label: "BAG&ACC",
        sub: "가방&악세사리",
        depth: [
          { id: 0, label: "ALL", sub: "전체" },
          { id: 1, label: "Bag", sub: "가방" },
          { id: 2, label: "Hat/Cap", sub: "모자/캡" },
          { id: 3, label: "Watch", sub: "시계" },
          { id: 4, label: "EyeWear", sub: "선글라스/안경" },
          { id: 5, label: "Jewelry", sub: "주얼리" },
          { id: 6, label: "Fashion acc", sub: "패션악세사리" },
        ],
      },
      {
        id: 4,
        label: "SHOES",
        sub: "슈즈",
        depth:
          categoryName === "men"
            ? menShoes
            : categoryName === "women"
              ? womenShoes
              : commonShoes,
      },
    ];
  }

  if (categoryName === "life") {
    return [
      { id: 1, label: "ALL", sub: "전체" },
      {
        id: 2,
        label: "HOME",
        sub: "홈",
        depth: [
          { id: 0, label: "ALL", sub: "전체" },
          { id: 1, label: "Kitchen", sub: "주방" },
          { id: 2, label: "Bedding", sub: "베딩" },
          { id: 3, label: "Home deco", sub: "홈 데코" },
          { id: 4, label: "Bathroom", sub: "욕실" },
          { id: 5, label: "HomeCare", sub: "홈케어" },
          { id: 6, label: "Furniture", sub: "가구" },
          { id: 7, label: "Stationery", sub: "문구류" },
          { id: 8, label: "Food", sub: "식음료" },
        ],
      },
      {
        id: 3,
        label: "TECH",
        sub: "테크",
        depth: [
          { id: 0, label: "ALL", sub: "전체" },
          { id: 1, label: "Electronics", sub: "생활가전" },
          { id: 2, label: "Phone Cases", sub: "폰케이스" },
          { id: 3, label: "Digital", sub: "디지털" },
          { id: 4, label: "Camera", sub: "카메라" },
          { id: 5, label: "Audio", sub: "오디오" },
        ],
      },
      {
        id: 4,
        label: "LEISURE",
        sub: "레저",
        depth: [
          { id: 0, label: "ALL", sub: "전체" },
          { id: 1, label: "Outdoor", sub: "아웃도어" },
          { id: 2, label: "Travel", sub: "여행" },
          { id: 3, label: "Culture", sub: "컬쳐" },
        ],
      },
      {
        id: 5,
        label: "PET",
        sub: "펫",
        depth: [
          { id: 0, label: "ALL", sub: "전체" },
          { id: 1, label: "Clothing", sub: "의류" },
          { id: 2, label: "Goods", sub: "펫 용품" },
          { id: 3, label: "Toy", sub: "장난감" },
          { id: 4, label: "House", sub: "펫 하우스" },
          { id: 5, label: "Dining", sub: "식기류" },
          { id: 6, label: "Food", sub: "식품" },
        ],
      },
    ];
  }

  if (categoryName === "beauty") {
    return [
      { id: 1, label: "ALL", sub: "전체" },
      { id: 2, label: "FRAGRANCE", sub: "향수" },
      { id: 3, label: "SKIN CARE", sub: "스킨케어" },
      { id: 4, label: "BODY CARE", sub: "바디케어" },
      { id: 5, label: "HAIR CARE", sub: "헤어케어" },
      { id: 6, label: "MAKE UP", sub: "메이크업" },
      { id: 7, label: "TOOL", sub: "뷰티기기" },
      { id: 8, label: "GROOMING", sub: "남성뷰티" },
    ];
  }

  return [];
}
