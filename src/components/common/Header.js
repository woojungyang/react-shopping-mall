import React, { useEffect, useRef, useState } from "react";

import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import classNames from "classnames";
import { Device } from "models/device";
import { Link } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_header.module.scss";

import { SearchContainer } from "./SearchContainer";

export default function Header() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [showSearch, setShowSearch] = useState(false);

  const [position, setPosition] = useState(0);
  const switchPosition = position > 100;
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (showSearch) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [showSearch]);

  return (
    <div
      className={classNames(
        { [styles.header_container]: true },
        { [styles.header_container_dark]: switchPosition },
      )}
    >
      <div className={styles.header_wrapper}>
        <div className={styles.category_wrapper}>
          <img
            src={
              switchPosition || !isDeskTop
                ? require("assets/images/common/logo.png")
                : require("assets/images/common/logo_trans.png")
            }
            alt="logo"
            className={styles.header_logo}
          />
          <div className={styles.category}>
            <Link to="/category/women">WOMEN</Link>
            <Link to="/category/men">MEN</Link>
            <Link to="/category/beauty">BEAUTY</Link>
            <Link to="/category/life">LIFE</Link>
            <Link to="/event">EVENT</Link>
          </div>
        </div>
        <div className={styles.user_wrapper}>
          {isDeskTop ? (
            <>
              <Link to="/login">SIGN IN</Link>
              <p onClick={() => setShowSearch(!showSearch)}>SEARCH</p>
              <Link to="/login">CART</Link>
            </>
          ) : (
            <>
              <SearchIcon
                className={styles.user_icon}
                onClick={() => setShowSearch(!showSearch)}
              />
              <ShoppingBagIcon className={styles.user_icon} />
              <LoginIcon className={styles.user_icon} />
            </>
          )}
        </div>
      </div>
      {showSearch && (
        <SearchContainer visible={showSearch} setVisible={setShowSearch} />
      )}
    </div>
  );
}
