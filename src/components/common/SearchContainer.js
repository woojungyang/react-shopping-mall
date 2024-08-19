import React, { useState } from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Device } from "models/device";
import { useNavigate } from "react-router-dom";

import useKeywordsQuery from "hooks/query/useKeywordsQuery";
import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_search.module.scss";

import { LoadingLayer } from "./LoadingLayer";
import { SearchInput } from "./SearchInput";

export const SearchContainer = ({ visible, setVisible }) => {
  const navigation = useNavigate();
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [searchValue, setSearchValue] = useState("");

  function searchItems(query) {
    navigation(`/search?keyword=${query}`);
    setVisible(false);
  }

  const { data: keywords, isLoading } = useKeywordsQuery();

  if (isLoading) return <LoadingLayer />;

  return (
    <>
      {isDeskTop ? (
        <div className={styles.search_container}>
          <div className={styles.search_wrapper}>
            <SearchInput
              value={searchValue}
              setValue={setSearchValue}
              onKeyDown={() => {
                searchItems(searchValue);
              }}
            />
            <div className={styles.keyword_wrapper}>
              <div className={styles.keyword_wrap1}>
                <p className={styles.keyword_title}>추천 검색어</p>
                <div className={styles.default_flex}>
                  {keywords?.recommendKeywords?.map(
                    (recommendedKeyword, index) => (
                      <p
                        key={index}
                        className={styles.keyword1}
                        onClick={() => searchItems(recommendedKeyword?.keyword)}
                      >
                        {recommendedKeyword?.keyword}
                      </p>
                    ),
                  )}
                </div>
              </div>
              <div className={styles.keyword_wrap2}>
                <p className={styles.keyword_title}>인기 검색어</p>
                {keywords?.hotKeywords?.map((hotKeyword, index) => (
                  <p
                    className={styles.keyword2}
                    onClick={() => searchItems(hotKeyword?.keyword)}
                  >
                    <span>{index + 1}</span>
                    {hotKeyword?.keyword}
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
            <SearchInput
              value={searchValue}
              setValue={setSearchValue}
              onKeyDown={() => {
                searchItems(searchValue);
              }}
            />

            <div className={styles.keyword_wrapper_mb}>
              <p className={styles.keyword_title}>
                TODAY HOT KEYWORDS <br />-
              </p>

              {keywords?.hotKeywords?.map((hotKeyword, index) => (
                <p
                  className={styles.keyword_mb}
                  key={index}
                  onClick={() => searchItems(hotKeyword?.keyword)}
                >
                  {hotKeyword?.keyword}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
