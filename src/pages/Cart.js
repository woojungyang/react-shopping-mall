import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout } from "components/common";
import CartContent from "components/pages/cart/CartContent";
import CartContentMb from "components/pages/cart/CartContentMb";

export default function Cart() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <>
      {isDeskTop ? (
        <CommonLayout>
          <CartContent /> :
        </CommonLayout>
      ) : (
        <CartContentMb />
      )}
    </>
  );
}
