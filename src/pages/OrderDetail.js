import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import OrderDetailContent from "components/pages/mypage/order/OrderDetailContent";
import OrderDetailContentMb from "components/pages/mypage/order/OrderDetailContentMb";

export default function OrderDetail() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <OrderDetailContent /> : <OrderDetailContentMb />}</>;
}
