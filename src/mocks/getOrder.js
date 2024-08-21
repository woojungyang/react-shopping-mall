import { faker } from "@faker-js/faker";
import { OrderState } from "models/order";
import { calculateSum } from "utilities";

export default function getOrder(mock) {
  mock.onGet(/^\/api\/v1\/orders\/(\d+)$/).reply((config) => {
    const status = 200;
    let data = {
      ...collection,
      paymentInformation: {
        ...collection.paymentInformation,
        totalPrice: calculateSum(collection.items.map((e) => e.price)),
      },
    };

    return [status, data];
  });
}

let collection = {
  id: faker.number.int(),
  createdAt: faker.date.between({
    from: "2024-01-01T00:00:00.000Z",
    to: "2024-12-31T00:00:00.000Z",
  }),

  orderNumber: faker.string.numeric(18),
  orderInformation: {
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
  },
  deliveryInformation: {
    id: faker.number.int(),
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    zipCode: faker.location.zipCode(),
    address: faker.location.streetAddress(),
  },
  paymentInformation: {
    id: faker.number.int(),
    method: "card",
  },
  items: new Array(faker.number.int({ max: 10, min: 1 }))
    .fill()
    .map((_, index) => {
      const price = faker.number.int({ max: 100000, min: 1000 });
      const quantity = faker.number.int({ max: 10, min: 1 });
      return {
        id: (index + 1) * faker.number.int(),
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
};
