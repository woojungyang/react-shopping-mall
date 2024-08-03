import { enumerate } from "utilities/enumeration";

export const OrderState = enumerate({
  PendingPayment: 1,
  ConfirmedOrder: 2,
  Preparing: 3,
  Delivery: 4,
  CompletedDelivery: 5,
  ConfirmedPurchase: 6,
  PendingExchange: 7,
  CompletedExchange: 8,
  PendingRefund: 9,
  CompletedRefund: 10,
  CanceledOrder: 11,
  IssuedPayment: 12,
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
    case OrderState.ConfirmedPurchase:
      return "구매확정";
    case OrderState.PendingExchange:
      return "교환신청";
    case OrderState.CompletedExchange:
      return "교환완료";
    case OrderState.PendingRefund:
      return "환불신청";
    case OrderState.CompletedRefund:
      return "환불완료";
    case OrderState.CanceledOrder:
      return "주문취소";
    case OrderState.IssuedPayment:
      return "결제오류";
    default:
      return "결제대기";
  }
}
