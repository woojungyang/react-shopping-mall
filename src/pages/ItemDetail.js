import React, { useState } from "react";

import { Device } from "models/device";
import { useParams } from "react-router-dom";

import useItemQuery from "hooks/query/useItemQuery";
import { useUserDevice } from "hooks/size/useUserDevice";

import { LoadingLayer } from "components/common";
import { ToastModal } from "components/modal";
import ItemDetailContent from "components/pages/detail/ItemDetailContent";
import ItemDetailContentMb from "components/pages/detail/ItemDetailContentMb";

export default function ItemDetail() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const { id } = useParams();

  const [toastMessage, setToastMessage] = useState("");

  const { data: item, isLoading } = useItemQuery(id, {
    onError: (error) => {
      setToastMessage(error.message);
    },
  });

  return (
    <div style={{ position: "relative" }}>
      {isLoading && <LoadingLayer />}
      {isDeskTop ? (
        <ItemDetailContent
          item={item}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      ) : (
        <ItemDetailContentMb />
      )}
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </div>
  );
}
