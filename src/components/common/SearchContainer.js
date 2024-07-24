import React, { useState } from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Device } from "models/device";
import { useNavigate } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_search.module.scss";

import { SearchInput } from "./SearchInput";

export const SearchContainer = ({ visible, setVisible }) => {
  const navigation = useNavigate();
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const dummy = Array.from({ length: 5 }, (v, i) => "키워드" + i + 1);
  const [recommendedKeywords, setRecommendedKeywords] = useState(dummy);
  const [hotKeywords, setHotKeywords] = useState(dummy);

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      {isDeskTop ? (
        <div className={styles.search_container}>
          <div className={styles.search_wrapper}>
            <SearchInput
              value={searchValue}
              setValue={setSearchValue}
              onKeyDown={() => {
                navigation(`/search?keyword=${searchValue}`);
              }}
            />
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
      ) : (
        <div className={styles.search_container_mb}>
          <div className={styles.search_header}>
            <div className={styles.go_back} onClick={() => setVisible(false)}>
              <KeyboardBackspaceIcon />
            </div>
            <h3>SEARCH</h3>
          </div>
          <div className={styles.search_body}>
            <SearchInput value={searchValue} setValue={setSearchValue} />

            <div className={styles.keyword_wrapper_mb}>
              <p className={styles.keyword_title}>
                TODAY HOT KEYWORDS <br />-
              </p>

              {hotKeywords?.map((hotKeyword, index) => (
                <p className={styles.keyword_mb}>{hotKeyword}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
