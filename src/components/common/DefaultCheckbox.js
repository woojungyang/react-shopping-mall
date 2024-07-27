import React from "react";

import { Checkbox } from "@mui/material";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

export const DefaultCheckbox = ({ checked, onChange }) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      sx={{
        "& .MuiSvgIcon-root": { fontSize: isDeskTop ? 24 : 20 },
        padding: "0 !important",
        color: "black",
        "&.Mui-checked": {
          color: "black",
        },
      }}
    />
  );
};
