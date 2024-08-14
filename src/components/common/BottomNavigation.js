import React, { useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import classNames from "classnames";
import { userToken } from "models/user";
import { useNavigate } from "react-router-dom";

import { ToastModal } from "components/modal";

import styles from "styles/_navigation.module.scss";

export default function BottomNavigation({ currentTab }) {
  const navigation = useNavigate();

  const bottomMenu = [
    {
      id: 1,
      name: "카테고리",
      icon: <ManageSearchIcon />,
    },
    {
      id: 2,
      name: "브랜드",
      icon: <StoreIcon />,
    },
    {
      id: 3,
      name: "홈",
      url: "/",

      icon: <HomeIcon />,
    },
    { id: 4, name: "좋아요", icon: <FavoriteBorderIcon /> },
    {
      id: 5,
      name: "마이",
      url: userToken ? "/mypage" : "/login",
      icon: <PersonIcon />,
    },
  ];

  const [toastMessage, setToastMessage] = useState("");

  return (
    <div className={styles.bottom_navigation_container}>
      {bottomMenu.map((menu, index) => (
        <div
          key={index}
          className={classNames({
            [styles.bottom_menu_wrapper]: true,
            [styles.bottom_menu_wrapper_active]: menu.url == currentTab,
          })}
          onClick={() => {
            if (!!menu.url) {
              navigation(menu.url);
            } else setToastMessage("준비중입니다.");
          }}
        >
          {menu.icon}
          <p className={styles.bottom_menu}>{menu.name}</p>
        </div>
      ))}
      <ToastModal
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </div>
  );
}
