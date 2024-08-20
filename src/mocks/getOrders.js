import { faker } from "@faker-js/faker";
import { QuestionState } from "models/notice";
import { OrderState } from "models/order";

import { addMonths, formatDateTime, now } from "utilities/dateTime";

export default function getOrders(mock) {
  mock.onGet(/^\/api\/v1\/orders$/).reply((config) => {
    const status = 200;
    let data = { total: collection.length, data: collection };

    let startedAt = new Date(formatDateTime(addMonths(now(), -3)));
    let endedAt = new Date(formatDateTime(now()));

    let orderProgress = collection.reduce(
      (acc, order) => {
        const orderDate = new Date(order.createdAt);

        if (orderDate >= startedAt && orderDate <= endedAt) {
          order.items.forEach((item) => {
            switch (item.state) {
              case OrderState.PendingPayment:
                acc.PendingPayment++;
                break;
              case OrderState.ConfirmedOrder:
                acc.ConfirmedOrder++;
                break;
              case OrderState.Preparing:
                acc.Preparing++;
                break;
              case OrderState.Delivery:
                acc.Delivery++;
                break;
              case OrderState.CompletedDelivery:
                acc.CompletedDelivery++;
                break;
              case OrderState.ConfirmedPurchase:
                acc.ConfirmedPurchase++;
                break;
              case OrderState.PendingExchange:
              case OrderState.CompletedExchange:
                acc.PendingExchange++;
                break;
              case OrderState.PendingRefund:
              case OrderState.CompletedRefund:
                acc.PendingRefund++;
                break;
              case OrderState.CanceledOrder:
                acc.CanceledOrder++;
                break;
              default:
                break;
            }
          });
        }

        return acc;
      },
      {
        PendingPayment: 0,
        ConfirmedOrder: 0,
        Preparing: 0,
        Delivery: 0,
        CompletedDelivery: 0,
        ConfirmedPurchase: 0,
        PendingExchange: 0,
        PendingRefund: 0,
        CanceledOrder: 0,
      },
    );

    data.orderProgress = orderProgress;

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;

    let startDate = config?.params?.startDate;
    let endDate = config?.params?.endDate;

    let state = config?.params?.state || "";

    data.data = collection
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((dateStr) => {
        const date = new Date(dateStr.createdAt);
        return date >= new Date(startDate) && date <= new Date(endDate);
      });

    data.total = data.data.length;
    data.data = data.data.slice(offset, offset + limit);

    return [status, data];
  });
}

let collection = new Array(faker.number.int({ max: 200, min: 10 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int,
    createdAt: faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: "2024-12-31T00:00:00.000Z",
    }),

    orderNumber: faker.string.numeric(18),
    items: new Array(faker.number.int({ max: 10, min: 1 }))
      .fill()
      .map((_, index) => {
        const price = faker.number.int({ max: 100000, min: 1000 });
        const quantity = faker.number.int({ max: 10, min: 1 });
        return {
          id: faker.number.int,
          itemName: faker.commerce.product(),
          quantity: quantity,
          price: price * quantity,
          option: faker.lorem.word(),
          thumbnail: require(
            `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
          ),
          state: faker.helpers.arrayElement(Object.values(OrderState)),
        };
      }),
  }));
