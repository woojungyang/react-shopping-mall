import React from "react";

import classNames from "classnames";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_detail.module.scss";

export default function TabsWrapper({ activeTab, scrollToElement }) {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const tabMenus = [
    { label: "detail" },
    { label: "review", count: 0 },
    { label: "q&a", count: 1 },
  ];
  return (
    <div className={styles.tab_menu_wrapper}>
      {tabMenus.map((tab, index) => (
        <div
          onClick={() => scrollToElement(tab.label)}
          key={index}
          className={classNames(
            isDeskTop
              ? {
                  [styles.tab_menu_wrap]: true,
                  [styles.tab_menu_wrap_active]: activeTab == tab.label,
                }
              : {
                  [styles.mobile_tab_menu_wrap]: true,
                  [styles.mobile_tab_menu_wrap_active]: activeTab == tab.label,
                },
          )}
        >
          <p>
            {tab.label.toUpperCase()}
            {!!tab.count ? `(${tab.count})` : ""}{" "}
          </p>
        </div>
      ))}
    </div>
  );
}
