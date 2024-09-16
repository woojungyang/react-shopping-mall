import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollTop } from "utilities";

import styles from "styles/_common.module.scss";

import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import ScrollNavigation from "./ScrollNavigation";
import { SearchContainer } from "./SearchContainer";

export const MobileLayout = ({
  headerTitle = "",
  children,
  showIcon = true,
  isFooter = false,
  isBottomNavigation = false,
}) => {
  const navigation = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    scrollTop();
  }, []);

  const cartItems = useSelector((state) => state.counter.items).length;

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

  return (
    <div className={styles.mobile_container}>
      <div className={styles.header_wrapper}>
        <KeyboardBackspaceIcon
          onClick={() => navigation(-1)}
          className={styles.left_btn_wrap}
        />
        <p>{headerTitle}</p>
        {showIcon && (
          <div className={styles.right_btn_wrap}>
            <SearchIcon
              style={{ marginRight: 10 }}
              onClick={() => setShowSearch(true)}
            />
            <div className={styles.cart_items_count}>
              <ShoppingBagOutlinedIcon
                className={styles.user_icon}
                onClick={() => navigation("/cart")}
              />
              {cartItems > 0 && <p>{cartItems > 98 ? "+99" : cartItems}</p>}
            </div>
          </div>
        )}
        {showSearch && (
          <SearchContainer visible={showSearch} setVisible={setShowSearch} />
        )}
      </div>
      {children}
      <ScrollNavigation />
      {isBottomNavigation && <BottomNavigation />}
      {isFooter && <Footer />}
    </div>
  );
};
