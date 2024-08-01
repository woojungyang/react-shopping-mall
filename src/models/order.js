import { enumerate } from "utilities/enumeration";

export const OrderState = enumerate({
  PendingPayment: 1,
  ConfirmedOrder: 2,
  Preparing: 3,
  Delivery: 4,
  CompletedDelivery: 5,
  PendingExchange: 6,
  CompletedExchange: 7,
  PendingRefund: 8,
  CompletedRefund: 9,
});

export function getOrderState(state) {
  switch (state) {
    case OrderState.ConfirmedOrder:
      return "주문접수";
    case OrderState.Preparing:
      return "상품준비중";
    case OrderState.Delivery:
      return "배송중";
    case OrderState.CompletedDelivery:
      return "배송완료";
    case OrderState.PendingExchange:
      return "교환신청";
    case OrderState.CompletedExchange:
      return "교환완료";
    case OrderState.PendingRefund:
      return "환불신청";
    case OrderState.CompletedRefund:
      return "환불완료";
    default:
      return "결제대기";
  }
}
