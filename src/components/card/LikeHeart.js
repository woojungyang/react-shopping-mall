import React, { useMemo, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { userToken } from "models/user";
import { useNavigate } from "react-router-dom";

export const LikeHeart = ({
  onClick,
  like = false,
  position = { top: "3%", right: "3%" },
  defaultColor = "white",
}) => {
  const [heart, setHeart] = useState(false);
  const getHeart = useMemo(() => setHeart(like), [like]);
  const navigation = useNavigate();

  function LikeItem(event) {
    event.stopPropagation();
    if (!userToken) navigation("/login");
    else {
      setHeart(!heart);
      onClick?.();
    }
  }

  const colors = {
    white: "#fff",
    skeleton: "#c4c4c4",
    dark: "#000",
    red: "#ff0000",
  };
  return (
    <div
      style={{
        position: "absolute",
        cursor: "pointer",
        ...position,
      }}
      onClick={LikeItem}
    >
      {!heart ? (
        <FavoriteBorderOutlinedIcon sx={{ color: colors[defaultColor] }} />
      ) : (
        <FavoriteIcon sx={{ color: "red" }} />
      )}
    </div>
  );
};
