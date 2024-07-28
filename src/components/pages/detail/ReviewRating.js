import React from "react";

import { Rating } from "@mui/material";

export default function ReviewRating({
  size = "1em",
  value = 0,
  color = "black",
  readOnly = true,
}) {
  return (
    <Rating
      name="half-rating-read"
      defaultValue={value}
      precision={0.5}
      readOnly={readOnly}
      sx={{
        fontSize: size,
        color: color,
      }}
    />
  );
}
