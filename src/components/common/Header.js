import React, { useEffect, useRef, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import classNames from "classnames";
import { Device } from "models/device";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_navigation.module.scss";

import { SearchContainer } from "./SearchContainer";

export default function Header() {
  const navigation = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname == "/";

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

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

  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (showSearch) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [showSearch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const [activeMobilMenu, setActiveMobileMenu] = useState("");

  return (
    <Link>
      {isDeskTop ? (
        <div
          ref={searchRef}
          className={classNames(
            { [styles.header_container]: true },
            { [styles.header_container_dark]: switchPosition || !isMainPage },
          )}
        >
          <div className={styles.header_wrapper}>
            <div className={styles.category_wrapper}>
              <img
                src={
                  switchPosition || !isMainPage
                    ? require("assets/images/common/logo.png")
                    : require("assets/images/common/logo_trans.png")
                }
                alt="logo"
                className={styles.header_logo}
                onClick={() => navigation("/")}
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
              <Link to="/login">LOGIN</Link>
              <Link to="/mypage/order">MY</Link>
              <p onClick={() => setShowSearch(!showSearch)}>SEARCH</p>
              <Link to="/cart">CART</Link>
            </div>
          </div>
          {showSearch && (
            <SearchContainer visible={showSearch} setVisible={setShowSearch} />
          )}
        </div>
      ) : (
        <div
          className={classNames({
            [styles.mb_header_container]: true,
            [styles.mb_header_container_scrolled]: true,
          })}
        >
          <div className={styles.header_wrapper_mb}>
            <div
              className={classNames({
                [styles.header_logo]: true,
                [styles.default_flex]: true,
              })}
            >
              <img src={require("assets/images/common/logo.png")} alt="logo" />
            </div>
            <div className={styles.header_icon_wrapper}>
              <SearchIcon
                className={styles.user_icon}
                onClick={() => setShowSearch(!showSearch)}
              />
              <ShoppingBagIcon
                className={styles.user_icon}
                onClick={() => navigation("/cart")}
              />
            </div>
          </div>
          <div className={styles.mb_scroll_menu_wrapper}>
            {mobileMenu.map((e, index) => (
              <p
                className={classNames({
                  [styles.default_scroll_menu]: true,
                  [styles.active_scroll_menu]: activeMobilMenu == e.id,
                })}
              >
                {e.name}
              </p>
            ))}
          </div>
          {showSearch && (
            <SearchContainer visible={showSearch} setVisible={setShowSearch} />
          )}
        </div>
      )}
    </Link>
  );
}

const mobileMenu = [
  { id: 1, name: "썸머위크" },
  { id: 2, name: "아울렛" },
  { id: 3, name: "세일" },
  { id: 4, name: "브랜드" },
  { id: 5, name: "여성" },
  { id: 5, name: "남성" },
  { id: 5, name: "#SNAP" },
  { id: 5, name: "#PICK" },
];
