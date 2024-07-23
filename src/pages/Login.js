import React, { useState } from "react";

import { CommonLayout } from "components/common";

import styles from "styles/_user.module.scss";

export default function Login() {
  const [inputValues, setInputValues] = useState({});
  function onChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }
  return (
    <CommonLayout>
      <div className={styles.login_container}>
        <h1>로그인</h1>
        <div>
          <p>기업 회원</p>
          <p>기업 회원</p>
        </div>
        <input type="username" value={inputValues?.username} />
      </div>
    </CommonLayout>
  );
}
