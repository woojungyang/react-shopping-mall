import React, { useMemo, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import useCreateUserMutation from "hooks/mutation/useCreateUserMutation";
import useEmailExistsMutation from "hooks/mutation/useEmailExistsMutation";

import { CommonLayout, DefaultButton } from "components/common";
import { DefaultInput } from "components/common/DefaultInput";

import {
  checkEmail,
  checkPassword,
  checkPhoneNumber,
} from "utilities/checkExpression";

import styles from "styles/_user.module.scss";

export default function Join() {
  const navigation = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  const [stage, setStage] = useState(1);

  const [inputValues, setInputValues] = useState({});
  function onChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }
  const [showPassword, setShowPassword] = useState(false);

  const emailExistsMutation = useEmailExistsMutation();

  async function checkUsername() {
    try {
      if (!inputValues.username || !checkEmail(inputValues.username))
        setToastMessage("이메일 아이디를 확인해주세요");
      else {
        const result = await emailExistsMutation.mutateAsync(inputValues);
        if (result) setStage(stage + 1);
      }
    } catch (error) {
      setToastMessage(error.message);
    }
  }

  const passwordCheckList = useMemo(() => {
    const password = inputValues?.password;

    const containsString = /(?=.*[a-z])(?=.*[A-Z])/;
    const containsNumber = /(?=.*\d)/;
    const containsSpecialCharacter = /(?=.*[@$!%*?&])/;
    const lengthRegex = /^.{8,16}$/;

    return [
      { label: "대소문자", check: containsString.test(password) },
      { label: "숫자", check: containsNumber.test(password) },
      { label: "특수문자", check: containsSpecialCharacter.test(password) },
      {
        label: "8-16자 이내",
        check: !!password ? lengthRegex.test(password) : false,
      },
    ];
  }, [inputValues?.password]);

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
        setToastMessage("비밀번호를 확인해주세요.");
      else setStage(stage + 1);
    } catch (error) {
      setToastMessage(error.message);
    }
  }

  const createUserMutation = useCreateUserMutation();
  async function requestJoinMember() {
    try {
      if (!inputValues.name) setToastMessage("이름을 입력해주세요.");
      else if (!inputValues.birthDate) setToastMessage("생년월일을 입력해주세요.");
      else if (
        !inputValues.phoneNumber ||
        !checkPhoneNumber(inputValues?.phoneNumber)
      )
        setToastMessage("휴대폰번호를 입력해주세요.");
      else {
        await createUserMutation.mutateAsync(inputValues);
        setToastMessage("회원가입완료");
        setTimeout(() => {
          navigation("/login");
        }, 3000);
      }
    } catch (error) {
      setToastMessage(error.message);
    }
  }

  return (
    <CommonLayout
      isLoading={emailExistsMutation.isLoading || createUserMutation.isLoading}
      setToastMessage={setToastMessage}
      toastMessage={toastMessage}
    >
      <div className={styles.user_container}>
        <h1>간편가입</h1>
        <div className={styles.process_wrapper}>
          <div
            className={styles.process_percent}
            style={{ width: `${stage * 25}%` }}
          ></div>
        </div>

        {stage == 1 && (
          <>
            <h3>
              로그인에 사용할 <br />
              아이디를 입력해주세요.
            </h3>
            <DefaultInput
              name="username"
              value={inputValues?.username}
              onChange={onChange}
              placeholder="아이디"
            />
          </>
        )}

        {stage == 2 && (
          <>
            <h3>
              로그인에 사용할 <br />
              비밀번호를 입력해주세요.
            </h3>
            <div className={styles.check_wrapper}>
              {passwordCheckList.map((e) => (
                <CheckLabel label={e.label} condition={e.check} />
              ))}
            </div>
            <DefaultInput
              name="password"
              value={inputValues?.password}
              type={!showPassword ? "password" : "text"}
              onChange={onChange}
              iconClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            />
            <div className={styles.check_wrapper}>
              <CheckLabel label="비밀번호 일치" condition={matchedPassword} />
            </div>
            <DefaultInput
              name="passwordConfirmed"
              value={inputValues?.passwordConfirmed}
              type={!showPassword ? "password" : "text"}
              onChange={onChange}
              iconClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            />
          </>
        )}
        {stage == 3 && (
          <>
            <h3>
              추가정보를 <br />
              입력해주세요.
            </h3>
            <DefaultInput
              name="name"
              value={inputValues?.name}
              onChange={onChange}
              placeholder="이름"
            />
            <DefaultInput
              name="birthDate"
              type="number"
              value={inputValues?.birthDate?.slice(0, 8)}
              onChange={onChange}
              placeholder="생년월일"
            />
            <DefaultInput
              name="phoneNumber"
              type="number"
              value={inputValues?.phoneNumber}
              onChange={onChange}
              placeholder="휴대전화번호"
            />
          </>
        )}

        <DefaultButton
          className={styles.button_dark_300_color_background_100}
          label={stage == 3 ? "완료" : "다음"}
          onClick={() => {
            if (stage == 1) checkUsername();
            else if (stage == 2) checkUserPassword();
            else if (stage == 3) requestJoinMember();
          }}
        />
      </div>
    </CommonLayout>
  );
}

function CheckLabel({ label, condition }) {
  return (
    <span
      className={classNames({
        [styles.check_wrap]: true,
        [styles.check_wrap_check]: condition,
      })}
    >
      <CheckIcon />
      {label}
    </span>
  );
}
