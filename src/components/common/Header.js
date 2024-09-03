import React, { useEffect, useRef, useState } from "react";

import { clearCart } from "app/counterSlice";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import classNames from "classnames";
import { Device } from "models/device";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_navigation.module.scss";

import { SearchContainer } from "./SearchContainer";

export default function Header() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

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

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Link>
      {isDeskTop ? (
        <div ref={searchRef} className={styles.header_container}>
          <div className={styles.header_wrapper}>
            <div className={styles.header_wrap}>
              <img
                src={require("assets/images/common/logo.png")}
                alt="logo"
                className={styles.header_logo}
                onClick={() => navigation("/")}
              />
              <div className={styles.user_wrapper}>
                <div onClick={() => setShowSearch(!showSearch)}>
                  <SearchIcon />
                  <p>SEARCH</p>
                </div>
                <div onClick={() => navigation("/cart")}>
                  <ShoppingBagIcon />
                  <p>CART</p>
                </div>
                {!token ? (
                  <div onClick={() => navigation("/login")}>
                    <ExitToAppIcon />
                    <p>LOGIN</p>
                  </div>
                ) : (
                  <>
                    <div onClick={() => navigation("/mypage")}>
                      <Person2Icon />
                      <p>MY</p>
                    </div>
                    <div
                      onClick={() => {
                        localStorage.clear();
                        setToken(null);
                        dispatch(clearCart);
                        navigation("/", { replace: true });
                      }}
                    >
                      <LogoutIcon />
                      <p>Logout</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.nav_wrapper}>
              <p onClick={() => navigation("/category/women")}>WOMEN</p>
              <p onClick={() => navigation("/category/men")}>MEN</p>
              <p onClick={() => navigation("/category/beauty")}>BEAUTY</p>
              <p onClick={() => navigation("/category/life")}>LIFE</p>
              <p onClick={() => navigation("/event")}>EVENT</p>
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
              <img
                src={require("assets/images/common/logo.png")}
                alt="logo"
                onClick={() => navigation("/")}
              />
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
                key={index}
                className={classNames({
                  [styles.default_scroll_menu]: true,
                  // [styles.active_scroll_menu]: activeMobilMenu == e.id,
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
