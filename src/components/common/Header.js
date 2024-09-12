import React, { useEffect, useRef, useState } from "react";

import { clearCart } from "app/counterSlice";

import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import classNames from "classnames";
import { Device } from "models/device";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_navigation.module.scss";

import { SearchContainer } from "./SearchContainer";

export default function Header() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const cartItems = useSelector((state) => state.counter.items).length;

  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  function searchItems(e) {
    if (!searchInputValue) alert("검색어를 입력해주세요.");
    else {
      navigation(`/search?keyword=${searchInputValue}`);
      setShowSearch(false);
    }
  }

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

  useEffect(() => {
    if (!isDeskTop) {
      const element = document.getElementsByClassName("current_menu")[0];

      if (element) {
        const tabMenu = document.querySelector("#tab_menu");
        tabMenu.scrollLeft = element.offsetLeft - element.offsetWidth;
      }
    }
  }, [isDeskTop]);

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
              <div className={styles.search_wrap}>
                <input
                  type="text"
                  value={searchInputValue}
                  onFocus={() => setShowSearch(true)}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchItems();
                  }}
                />

                <SearchIcon onClick={searchItems} />
              </div>
              <div className={styles.user_wrapper}>
                <div onClick={() => navigation("/cart")}>
                  <div className={styles.cart_items_count}>
                    <ShoppingBagOutlinedIcon className={styles.user_icon} />
                    {cartItems > 0 && (
                      <p>{cartItems > 98 ? "+99" : cartItems}</p>
                    )}
                  </div>
                  <p>CART</p>
                </div>

                <div onClick={() => navigation("/mypage/heart")}>
                  <FavoriteBorderOutlinedIcon />
                  <p>HEART</p>
                </div>
                {!token ? (
                  <div onClick={() => navigation("/login")}>
                    <ExitToAppIcon />
                    <p>LOGIN</p>
                  </div>
                ) : (
                  <>
                    <div onClick={() => navigation("/mypage")}>
                      <AccountBoxOutlinedIcon />
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
                      <ExitToAppOutlinedIcon />
                      <p>LOGOUT</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.nav_wrapper}>
              <MenuList list={menuList} isDeskTop={isDeskTop} />
              <div className={styles.event_menu_wrap}>
                <MenuList list={eventMenuList} isDeskTop={isDeskTop} />
              </div>
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

              <div className={styles.cart_items_count}>
                <ShoppingBagOutlinedIcon
                  className={styles.user_icon}
                  onClick={() => navigation("/cart")}
                />
                {cartItems > 0 && <p>{cartItems > 98 ? "+99" : cartItems}</p>}
              </div>
            </div>
          </div>
          <div className={styles.mb_scroll_menu_wrapper} id="tab_menu">
            <MenuList
              list={[
                { id: 0, name: "HOME", link: "/" },
                ...menuList,
                ...eventMenuList,
              ]}
              isDeskTop={isDeskTop}
            />
          </div>
          {showSearch && (
            <SearchContainer visible={showSearch} setVisible={setShowSearch} />
          )}
        </div>
      )}
    </Link>
  );
}

function MenuList({ list, isDeskTop = false }) {
  const navigation = useNavigate();
  const { id: categoryName } = useParams();
  const pathname = window.location.pathname.split("/")[1];

  const currentMenuArray = [categoryName, pathname].filter(Boolean);

  return (
    <>
      {list?.map((menu, index) => {
        const checkCurrentMenu =
          currentMenuArray.indexOf(menu.name.toLowerCase()) > -1;
        return (
          <p
            key={index}
            style={{
              color:
                checkCurrentMenu ||
                (currentMenuArray.length == 0 && menu.name == "HOME")
                  ? "rgb(254, 99, 32)"
                  : "",
            }}
            className={classNames({
              [styles.default_scroll_menu]: !isDeskTop,
              current_menu: checkCurrentMenu,
            })}
            onClick={() => navigation(menu.link)}
          >
            {menu.name}
          </p>
        );
      })}
    </>
  );
}

const menuList = [
  { id: 1, name: "WOMEN", link: "/category/women" },
  { id: 2, name: "MEN", link: "/category/men" },
  { id: 3, name: "BEAUTY", link: "/category/beauty" },
  { id: 4, name: "LIFE", link: "/category/life" },
  { id: 5, name: "KIDS", link: "/category/kid" },
  // { id: 6, name: "EVENT", link: "/event" },
];

const eventMenuList = [
  { id: 1, name: "EVENT", link: "/event" },
  { id: 2, name: "LOOKBOOK", link: "/lookbook" },
];
