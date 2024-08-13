import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Device } from "models/device";
import { scrollBottom, scrollTop } from "utilities";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_common.module.scss";

export default function ScrollNavigation() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [position, setPosition] = useState(0);
  const switchPosition = position > 50;
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div>
      {switchPosition && (
        <>
          <div className={styles.scroll_top_button} onClick={scrollTop}>
            <KeyboardArrowUpIcon />
          </div>
          <div
            className={styles.scroll_top_button}
            style={{ bottom: isDeskTop ? "6%" : "6.5%" }}
            onClick={scrollBottom}
          >
            <KeyboardArrowDownIcon />
          </div>
        </>
      )}
    </div>
  );
}
