import { enumerate } from "utilities/enumeration";

export const Device = enumerate({
  Desktop: 1,
  Tablet: 2,
  Mobile: 3,
});

export const DeviceSize = enumerate({
  Desktop: 1281,
  Tablet: 1024,
  Mobile: 768,
});
