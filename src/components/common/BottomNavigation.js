import React from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";

import styles from "styles/_navigation.module.scss";

export default function BottomNavigation() {
  const navigation = useNavigate();

  const bottomMenu = [
    { id: 1, name: "카테고리", onClick: () => {}, icon: <ManageSearchIcon /> },
    { id: 2, name: "브랜드", onClick: () => {}, icon: <StoreIcon /> },
    {
      id: 3,
      name: "홈",
      onClick: () => {
        navigation(`/login`);
      },
      icon: <HomeIcon />,
    },
    { id: 4, name: "좋아요", onClick: () => {}, icon: <FavoriteBorderIcon /> },
    { id: 5, name: "마이", onClick: () => {}, icon: <PersonIcon /> },
  ];

  return (
    <div className={styles.bottom_navigation_container}>
      {bottomMenu.map((menu, index) => (
        <div
          key={index}
          className={styles.bottom_menu_wrapper}
          onClick={() => menu?.onClick()}
        >
          {menu.icon}
          <p className={styles.bottom_menu}>{menu.name}</p>
        </div>
      ))}
    </div>
  );
}
