import React, { useEffect, useMemo, useRef, useState } from "react";

import { clearCart } from "app/counterSlice";

import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import classNames from "classnames";
import { getSubCategory } from "models/category";
import { Device } from "models/device";
import { getEventTypeLabel } from "models/event";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import useEventsQuery from "hooks/query/useEventsQuery";
import { useUserDevice } from "hooks/size/useUserDevice";

import { ToastModal } from "components/modal";

import styles from "styles/_navigation.module.scss";

import { SearchContainer } from "./SearchContainer";

export default function Header() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [toastMessage, setToastMessage] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const cartItems = useSelector((state) => state.counter.items).length;

  const [isHovering, setIsHovering] = useState(false);
  const [hoverElement, setHoverElement] = useState("");
  function handleMouseOver(element) {
    if (isDeskTop) {
      setIsHovering(true);
      setHoverElement(element.toLowerCase());
    } else return;
  }

  function handleMouseLeave() {
    setIsHovering(false);
    setHoverElement("");
  }

  const subCategory = useMemo(
    () => getSubCategory(hoverElement),
    [hoverElement],
  );

  const { data: events, isLoading } = useEventsQuery({
    offset: 0,
    limit: 2,
  });

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
    <div>
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
              <MenuList
                list={menuList}
                isDeskTop={isDeskTop}
                handleMouseOver={handleMouseOver}
              />
              <div className={styles.event_menu_wrap}>
                <MenuList list={eventMenuList} isDeskTop={isDeskTop} />
              </div>
            </div>
            {hoverElement && (
              <div
                className={styles.hover_menu_container}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.hover_menu_wrapper}>
                  <div className={styles.hover_menu_wrap}>
                    {subCategory.slice(1).map((cate1, index) => (
                      <div key={index} className={styles.hover_menu}>
                        <p
                          className={styles.hover_menu_subcategory}
                          onClick={() => {
                            navigation(
                              `/category/${hoverElement}?subCategory=${cate1.id}`,
                            );
                            window.localStorage.removeItem("promotion");
                          }}
                        >
                          {cate1.label}
                          <ChevronRightIcon />
                        </p>
                        {!!cate1.depth?.length && (
                          <div className={styles.hover_menu_smallcategory}>
                            {cate1.depth.slice(1).map((depth) => (
                              <p
                                onClick={() => {
                                  navigation(
                                    `/category/${hoverElement}?subCategory=${cate1.id}&smallCategory=${depth.id}`,
                                  );
                                  window.localStorage.removeItem("promotion");
                                  handleMouseLeave();
                                }}
                              >
                                {depth.label}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className={styles.event_wrapper}>
                    {events?.data.map((event, index) => (
                      <div
                        key={index}
                        className={styles.event_card}
                        onClick={() => setToastMessage("페이지 준비중입니다.")}
                      >
                        <div className={styles.event_thumbnail_wrap}>
                          <img src={event.thumbnail} />
                          <span className={styles.event_badge}>
                            {getEventTypeLabel(event.type)}
                          </span>
                        </div>
                        <p className={styles.event_card_title}>{event.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {showSearch && (
            <SearchContainer visible={showSearch} setVisible={setShowSearch} />
          )}
          {toastMessage && (
            <ToastModal
              toastMessage={toastMessage}
              setToastMessage={setToastMessage}
            />
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
    </div>
  );
}

function MenuList({
  list,
  isDeskTop = false,
  handleMouseOver = () => {},
  handleMouseOut = () => {},
}) {
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
          <div
            className={styles.default_scroll_menu_wrap}
            key={index}
            onMouseOver={() => handleMouseOver(menu.name)}
            // onMouseOut={handleMouseOut}
          >
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
              onClick={() => {
                navigation(menu.link);
                if (isDeskTop) window.localStorage.setItem("promotion", true);
              }}
            >
              {menu.name}
            </p>
          </div>
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
  { id: 5, name: "KID", link: "/category/kid" },
  // { id: 6, name: "EVENT", link: "/event" },
];

const eventMenuList = [
  { id: 1, name: "EVENT", link: "/event" },
  { id: 2, name: "LOOKBOOK", link: "/lookbook" },
];
