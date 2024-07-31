import { enumerate } from "utilities/enumeration";

export const OrderState = enumerate({
  PaymentPending: 1,
  Preparing: 2,
  Delivery: 3,
  DeliveryCompleted: 4,
  ExchangePending: 5,
  ExchangeCompleted: 6,
  RefundPending: 7,
  RefundCompleted: 8,
});

export function getOrderState(state) {
  switch (state) {
    case OrderState.Preparing:
      return "상품준비중";
    case OrderState.Delivery:
      return "배송중";
    case OrderState.DeliveryCompleted:
      return "배송완료";
    case OrderState.ExchangePending:
      return "교환신청";
    case OrderState.ExchangeCompleted:
      return "교환완료";
    case OrderState.RefundPending:
      return "환불신청";
    case OrderState.RefundCompleted:
      return "환불완료";
    default:
      return "결제대기";
  }
}
