import React from "react";

import { Checkbox } from "@mui/material";

export const DefaultCheckbox = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      sx={{
        color: "black",
        "&.Mui-checked": {
          color: "black",
        },
      }}
    />
  );
};
