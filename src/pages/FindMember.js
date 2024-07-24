import React, { useMemo, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import useQueryString from "hooks/queryString/useQueryString";

import { CommonLayout, DefaultButton } from "components/common";
import { DefaultInput } from "components/common/DefaultInput";

import {
  checkEmail,
  checkPassword,
  checkPhoneNumber,
} from "utilities/checkExpression";

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

  async function requestChangePassword() {
    try {
      if (
        !inputValues.password ||
        !checkPassword(inputValues.password) ||
        !matchedPassword
      )
        alert("비밀번호를 확인해주세요.");
      else {
        alert("비밀번호 변경이 완료되었습니다.");
        navigation("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function requestFindUsername() {
    try {
      if (!inputValues.name) alert("이름을 입력해주세요.");
      else if (
        !inputValues.phoneNumber ||
        !checkPhoneNumber(inputValues?.phoneNumber)
      )
        alert("휴대폰번호를 확인해주세요.");
      else if (
        !isFindTypeId &&
        (!inputValues.username || !checkEmail(inputValues.username))
      )
        alert("이메일 아이디를 확인해주세요");
      else {
        setStage(stage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [findType] = useQueryString("findType");
  const isFindTypeId = findType == "id";

  function switchTab(query) {
    navigation(query);
    setStage(1);
    setInputValues({});
  }

  return (
    <CommonLayout>
      <div className={styles.user_container}>
        <h1>계정찾기</h1>
        <div className={styles.tab_menu_wrapper}>
          <Tab
            label="아이디"
            active={isFindTypeId}
            onClick={() => switchTab("?findType=id")}
          />
          <Tab
            label="비밀번호"
            active={!isFindTypeId}
            onClick={() => switchTab("?findType=password")}
          />
        </div>

        {stage == 1 && (
          <>
            <h3>
              {isFindTypeId ? "이름과" : "이름,이메일"} <br />
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
            {!isFindTypeId && (
              <DefaultInput
                name="username"
                value={inputValues?.username}
                onChange={onChange}
                placeholder="이메일"
              />
            )}
          </>
        )}
        {isFindTypeId && stage == 2 && (
          <>
            <p className={styles.username}>username@email.com</p>
            <p className={styles.username}>가입된 정보가 없습니다.</p>
          </>
        )}
        {!isFindTypeId && stage == 2 && (
          <>
            <h3>
              변경할 <br />
              비밀번호를 입력해주세요.
            </h3>

            <DefaultInput
              name="password"
              value={inputValues?.password}
              type={!showPassword ? "password" : "text"}
              onChange={onChange}
              iconClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              placeholder="영문+숫자+특스문자 조합 8~16자리"
            />
            <DefaultInput
              name="passwordConfirmed"
              value={inputValues?.passwordConfirmed}
              type={!showPassword ? "password" : "text"}
              onChange={onChange}
              iconClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              placeholder="영문+숫자+특스문자 조합 8~16자리"
            />
          </>
        )}

        <DefaultButton
          className={styles.button_dark_300_color_background_100}
          label={
            !isFindTypeId
              ? stage == 1
                ? "비밀번호 찾기"
                : "비밀번호 변경"
              : stage == 1
                ? "아이디 찾기"
                : "홈으로 돌아가기"
          }
          onClick={() => {
            if (stage == 1) requestFindUsername();
            else if (stage == 2) {
              if (isFindTypeId) navigation("/login");
              else requestChangePassword();
            }
            // else if (stage == 3) requestJoinMember();
          }}
        />
      </div>
    </CommonLayout>
  );
}

function Tab({ label, onClick, active = false }) {
  return (
    <p
      onClick={onClick}
      className={classNames({
        [styles.tab_wrap]: true,
        [styles.tab_wrap_active]: active,
      })}
    >
      {label}
    </p>
  );
}
