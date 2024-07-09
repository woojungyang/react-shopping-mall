import React, { useEffect, useRef, useState } from "react";

import styles from "styles/_header.module.scss";

import { SearchInput } from "./SearchInput";

export const SearchContainer = ({ visible, setVisible }) => {
  const dummy = Array.from({ length: 5 }, (v, i) => "키워드" + i + 1);
  const [recommendedKeywords, setRecommendedKeywords] = useState(dummy);
  const [hotKeywords, setHotKeywords] = useState(dummy);

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.search_container}>
      <div className={styles.search_wrapper}>
        <SearchInput value={searchValue} setValue={setSearchValue} />
        <div className={styles.keyword_wrapper}>
          <div className={styles.keyword_wrap1}>
            <p className={styles.keyword_title}>추천 검색어</p>
            <div className={styles.default_flex}>
              {recommendedKeywords?.map((recommendedKeyword) => (
                <p className={styles.keyword1}>{recommendedKeyword}</p>
              ))}
            </div>
          </div>
          <div className={styles.keyword_wrap2}>
            <p className={styles.keyword_title}>인기 검색어</p>
            {hotKeywords?.map((hotKeyword, index) => (
              <p className={styles.keyword2}>
                <span>{index + 1}</span>
                {hotKeyword}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
