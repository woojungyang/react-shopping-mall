import React from "react";

import SearchIcon from "@mui/icons-material/Search";

import styles from "styles/_common.module.scss";

export const SearchInput = ({ value = "", setValue }) => {
  return (
    <div className={styles.search_input}>
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력해 주세요."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !value) alert("검색어를 입력해주세요.");
        }}
      />
    </div>
  );
};
