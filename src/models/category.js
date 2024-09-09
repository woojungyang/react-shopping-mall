import { enumerate } from "utilities/enumeration";

export const filterList = [
  { label: "신상품순", sort: "new" },
  { label: "판매순", sort: "sale" },
  { label: "낮은가격순", sort: "lowPrice" },
  { label: "높은가격순", sort: "heighPrice" },
];

export const categoryList = ["women", "men", "life", "beauty", "kid"];

export function getSubCategory(categoryName) {
  if (!categoryName) return [];
  if (categoryName == "women" || categoryName == "men" || categoryName == "kid")
    return [
      { id: 1, label: "ALL", sub: "전체" },
      { id: 2, label: "CLOTHING", sub: "의류" },
      { id: 3, label: "BAG&ACC", sub: "가방&악세사리" },
      { id: 4, label: "SHOES", sub: "슈즈" },
    ];
  if (categoryName == "life")
    return [
      { id: 1, label: "ALL", sub: "전체" },
      { id: 2, label: "HOME", sub: "홈" },
      { id: 3, label: "TECH", sub: "테크" },
      { id: 4, label: "LEISURE", sub: "레저" },
      { id: 5, label: "PET", sub: "펫" },
    ];
  if (categoryName == "beauty")
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
