import { faker } from "@faker-js/faker";
import { HeartType } from "models/mypage";

export default function getLIkes(mock) {
  const url = /^\/api\/v1\/likes$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
    let data = {
      total: itemsCollection.length,
      data: itemsCollection,
    };

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;
    let type = config?.params?.type || "";
    let excludingSoldOut = config?.params?.excludingSoldOut;

    if (excludingSoldOut && HeartType.Item == type)
      data.data = data.data.filter((e) => !e.isSoldOut);

    if (type == HeartType.Brand) {
      data = {
        total: brandsCollection.length,
        data: brandsCollection,
      };
    } else if (type == HeartType.Style) {
      console.log("여기!");
      data = {
        total: styleCollection.length,
        data: styleCollection,
      };
    }

    data.situation = {
      item: itemsCollection.length,
      brand: brandsCollection.length,
      style: styleCollection.length,
    };

    data.total = data.data.length;
    data.data = data.data.slice(offset, offset + limit);

    return [status, data];
  });
}

function fakerSubImage() {
  return require(
    `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
  );
}
let itemsCollection = new Array(faker.number.int({ max: 100, min: 10 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    itemName: faker.commerce.productName(),
    thumbnail: fakerSubImage(),
    originalPrice: faker.commerce.price({
      min: 9100,
      max: 10000,
      dec: 0,
    }),
    price: faker.commerce.price({
      min: 100,
      max: 9000,
      dec: 0,
    }),
    brandName: faker.company.name(),
    isSoldOut: faker.helpers.arrayElement([true, false]),
  }));

let brandsCollection = new Array(faker.number.int({ max: 10, min: 1 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    name: faker.company.name(),
    items: new Array(5).fill().map((_, index) => ({
      id: faker.number.int(),
      itemName: faker.commerce.productName(),
      originalPrice: faker.commerce.price({
        min: 9100,
        max: 10000,
        dec: 0,
      }),
      price: faker.commerce.price({
        min: 100,
        max: 9000,
        dec: 0,
      }),
      thumbnail: fakerSubImage(),
      like: faker.helpers.arrayElement([true, false]),
    })),
  }));

let styleCollection = new Array(faker.number.int({ max: 10, min: 1 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    username: faker.internet.email(),
    avatar: require(
      `assets/images/user/user${faker.number.int({ max: 8, min: 1 })}.jpg`,
    ),
  }));
