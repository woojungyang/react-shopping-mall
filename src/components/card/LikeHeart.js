import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import styles from "styles/_common.module.scss";

export const LikeHeart = ({
  onClick,
  like = false,
  position = { top: "3%", right: "3%" },
  defaultColor = "white",
}) => {
  const [status, setStatus] = useState(like);
  function LikeItem() {
    setStatus(!status);
  }

  const colors = {
    white: "#fff",
    skeleton: "#c4c4c4",
  };
  return (
    <div
      style={{
        position: "absolute",
        cursor: "pointer",
        ...position,
      }}
      className={styles.like_heart}
      onClick={LikeItem}
    >
      {!status ? (
        <FavoriteBorderOutlinedIcon sx={{ color: colors[defaultColor] }} />
      ) : (
        <FavoriteIcon sx={{ color: "red" }} />
      )}
    </div>
  );
};
