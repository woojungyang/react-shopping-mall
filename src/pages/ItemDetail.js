import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout } from "components/common";
import ItemDetailContent from "components/pages/detail/ItemDetailContent";

export default function ItemDetail() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <CommonLayout>{isDeskTop ? <ItemDetailContent /> : <></>}</CommonLayout>
  );
}
