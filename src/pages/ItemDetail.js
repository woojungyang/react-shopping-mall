import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import ItemDetailContent from "components/pages/detail/ItemDetailContent";
import ItemDetailContentMb from "components/pages/detail/ItemDetailContentMb";

export default function ItemDetail() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <ItemDetailContent /> : <ItemDetailContentMb />}</>;
}
