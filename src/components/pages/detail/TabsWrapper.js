import React from "react";

import classNames from "classnames";

import styles from "styles/_detail.module.scss";

export default function TabsWrapper({ activeTab, scrollToElement }) {
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
          className={classNames({
            [styles.tab_menu_wrap]: true,
            [styles.tab_menu_wrap_active]: activeTab == tab.label,
          })}
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
