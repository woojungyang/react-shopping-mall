import React, { useMemo, useState } from "react";

import AppsIcon from "@mui/icons-material/Apps";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { ToastModal } from "components/modal";

import styles from "styles/_navigation.module.scss";

export default function BottomNavigation({ currentTab }) {
  const navigation = useNavigate();

  const bottomMenu = useMemo(
    () => [
      {
        id: 1,
        name: "CATEGORY",
        icon: <ManageSearchIcon />,
      },
      {
        id: 2,
        name: "SHOP",
        icon: <StoreIcon />,
      },
      {
        id: 3,
        name: "HOME",
        url: "/",

        icon: <AppsIcon />,
      },
      {
        id: 4,
        name: "HEART",
        icon: <FavoriteBorderIcon />,
        url: "/mypage/heart",
      },
      {
        id: 5,
        name: "MY",
        url: localStorage.getItem("token") ? "/mypage" : "/login",
        icon: <PersonIcon />,
      },
    ],
    [localStorage.getItem("token")],
  );

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
