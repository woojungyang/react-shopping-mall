import { useUserDevice } from "hooks/size/useUserDevice";

import { enumerate } from "utilities/enumeration";

export const EventType = enumerate({
  Sale: 1,
  Promotion: 2,
  Brand: 3,
  Trend: 4,
});

export function getEventTypeLabel(state) {
  switch (state) {
    case EventType.Sale:
      return "SALE";
    case EventType.Promotion:
      return "PROMOTION";
    case EventType.Brand:
      return "BRAND";
    case EventType.Trend:
      return "TREND";
    default:
      return "VIEW ALL";
  }
}
