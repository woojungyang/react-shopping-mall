import React, { useMemo, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { CommonLayout, DefaultButton } from "components/common";
import { DefaultInput } from "components/common/DefaultInput";

import { checkEmail, checkPassword } from "utilities/checkExpression";

import styles from "styles/_user.module.scss";

export default function FindMember() {
  const navigation = useNavigate();
  const [stage, setStage] = useState(1);

  const [inputValues, setInputValues] = useState({});
  function onChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }
  const [showPassword, setShowPassword] = useState(false);

  async function checkUserName() {
    try {
      if (!inputValues.username || !checkEmail(inputValues.username))
        alert("이메일 아이디를 확인해주세요");
      else setStage(stage + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const matchedPassword = useMemo(
    () =>
      inputValues?.password &&
      inputValues?.password == inputValues?.passwordConfirmed,
    [inputValues?.password, inputValues?.passwordConfirmed],
  );

  async function checkUserPassword() {
    try {
      if (
        !inputValues.password ||
        !checkPassword(inputValues.password) ||
        !matchedPassword
      )
        alert("비밀번호를 확인해주세요.");
      else setStage(stage + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function requestJoinMember() {
    try {
      if (!inputValues.name) alert("이름을 입력해주세요.");
      else if (!inputValues.birthDate) alert("생년월일을 입력해주세요.");
      else {
        alert("회원가입완료");
        navigation("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CommonLayout>
      <div className={styles.user_container}>
        <h1>계정찾기</h1>
        <div className={styles.tab_menu_wrapper}>
          <Tab label="아이디" active={true} />
          <Tab label="비밀번호" />
        </div>

        <h3>
          이름과 <br />
          휴대폰번호를 입력해주세요.
        </h3>
        <DefaultInput
          name="name"
          value={inputValues?.name}
          onChange={onChange}
          placeholder="이름"
        />
        <DefaultInput
          name="phoneNumber"
          type="number"
          value={inputValues?.phoneNumber}
          onChange={onChange}
          placeholder="휴대전화번호"
        />
        <DefaultButton
          className={styles.button_dark_300_color_background_100}
          label="아이디 찾기"
          onClick={() => {
            if (stage == 1) checkUserName();
            else if (stage == 2) checkUserPassword();
            else if (stage == 3) requestJoinMember();
          }}
        />
      </div>
    </CommonLayout>
  );
}

function Tab({ label, onClick, active = false }) {
  return (
    <p
      className={classNames({
        [styles.tab_wrap]: true,
        [styles.tab_wrap_active]: active,
      })}
    >
      {label}
    </p>
  );
}
