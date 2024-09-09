import React, { useLayoutEffect } from "react";

import { Device } from "models/device";
import { useParams } from "react-router-dom";

import { useUserDevice } from "hooks/size/useUserDevice";

import CategoryContent from "components/pages/category/CategoryContent";
import CategoryContentMb from "components/pages/category/CategoryContentMb";

import NotFound from "./NotFound";

export default function Category() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const { id } = useParams();

  const categoryList = ["women", "men", "life", "beauty", "kid"];

  if (categoryList.indexOf(id) < 0) return <NotFound />;

  return <>{isDeskTop ? <CategoryContent /> : <CategoryContentMb />}</>;
}
