import React from "react";

import { useNavigate } from "react-router-dom";

import { DefaultButton } from "components/common";

import styles from "styles/_common.module.scss";

export default function NotFound() {
  const navigation = useNavigate();
  return (
    <div className={styles.not_found_container}>
      <img src={require("assets/images/common/404-error.png")} />
      <a
        href="https://www.flaticon.com/kr/free-icons/404-"
        title="404 오류 아이콘"
      >
        404 오류 아이콘 제작자: berkahicon - Flaticon
      </a>
      <DefaultButton label="홈으로 돌아가기" onClick={() => navigation("/")} />
    </div>
  );
}
