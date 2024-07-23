import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { CommonLayout, DefaultButton } from "components/common";
import { DefaultInput } from "components/common/DefaultInput";

import { checkEmail, checkPassword } from "utilities/checkExpression";

import styles from "styles/_user.module.scss";

export default function Login() {
  const navigation = useNavigate();

  const [inputValues, setInputValues] = useState({});
  function onChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }
  const [showPassword, setShowPassword] = useState(false);

  async function requestLogin() {
    try {
      if (!inputValues.username || !checkEmail(inputValues.username))
        alert("이메일 아이디를 확인해주세요");
      else if (!inputValues.password || !checkPassword(inputValues.password))
        alert(
          "비밀번호를 입력해주세요. 비밀번호는 영문+숫자+특스문자 조합 8~16자리입니다",
        );
      else alert("로그인 성공");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CommonLayout>
      <div className={styles.user_container}>
        <h1>로그인</h1>
        <DefaultInput
          name="username"
          value={inputValues?.username}
          onChange={onChange}
          placeholder="아이디"
        />
        <DefaultInput
          name="password"
          value={inputValues?.password}
          type={!showPassword ? "password" : "text"}
          onChange={onChange}
          iconClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          placeholder="비밀번호"
        />
        <DefaultButton
          className={styles.button_dark_300_color_background_100}
          label="로그인"
          onClick={requestLogin}
        />
        <DefaultButton className={styles.button_kakao}>
          <img
            src={require("assets/icon/kakao.png")}
            style={{ width: 18, height: 18, marginTop: -2, marginRight: 10 }}
          />
          <p>카카오 로그인</p>
        </DefaultButton>
        <DefaultButton
          className={styles.button_background_100_outline_color_dark_300}
          onClick={() => navigation("/join")}
          label="간편회원가입"
        />
        <div className={styles.find_information_wrapper}>
          <span onClick={() => navigation("/find?findType=id")}>
            아이디 찾기
          </span>
          <span>|</span>
          <span onClick={() => navigation("/find?findType=password")}>
            비밀번호 찾기
          </span>
        </div>
      </div>
    </CommonLayout>
  );
}
