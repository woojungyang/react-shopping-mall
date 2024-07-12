import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_navigation.module.scss";

export default function Footer() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_wrapper}>
        <div>
          <p className={styles.footer_strong}>
            <span>개인정보처리방침</span> | <span>이용약관</span>
          </p>
          <p>
            상호명 : 주식회사 우티크 (WOOTIQUE Co., Ltd.) 팩스 : 010-1233-4444
            사업자등록번호 : 000-00-0000
          </p>
          <p>
            일부 상품의 경우 WOOTIQUE는 통신판매의 당사자가 아닌
            통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수
            있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
          </p>
        </div>
        <p>COPYRIGHT ⓒ WOOJUNGYANG ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
}
