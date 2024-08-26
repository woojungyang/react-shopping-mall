import React from "react";

import { Checkbox } from "@mui/material";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

export const DefaultCheckbox = ({ checked, onChange, disabled = false }) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      sx={{
        marginRight: "10px",
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
