import { faker } from "@faker-js/faker";
import { userToken } from "models/user";


export default function getItems(mock) {
  const url = /^\/api\/v1\/items$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
    let data = {
      total: collection.length,
      data: collection,
    };

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;

    let keyword = config.params.keyword || "";
    let sort = config.params.sort || "";
    let excludingSoldOut = config?.params?.excludingSoldOut;

    if (excludingSoldOut) data.data = data.data.filter((e) => !e.isSoldOut);
    else data.data = collection;

    if (!!keyword)
      data.data = data.data.filter((e) =>
        e.itemName.toLowerCase().includes(keyword),
      );

    if (sort == "new")
      data.data = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort == "sale")
      data.data = data.data.sort((a, b) => b.SalesQuantity - a.SalesQuantity);
    if (sort == "lowPrice")
      data.data = data.data.sort((a, b) => a.price - b.price);
    if (sort == "heighPrice")
      data.data = data.data.sort((a, b) => b.price - a.price);

    data.total = data.data.length;
    data.data = data.data.slice(offset, offset + limit);

    return [status, data];
  });

  function fakerSubImage() {
    return require(
      `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
    );
  }

  let collection = new Array(faker.number.int({ max: 100, min: 10 }))
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
      like: userToken ? faker.helpers.arrayElement([true, false]) : false,
      likeCount: faker.number.int({ max: 1000, min: 5 }),
      reviewCount: faker.number.int({ max: 1000, min: 5 }),
      brandName: faker.company.name(),

      registeredAt: faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: "2024-07-31T00:00:00.000Z",
      }),
      SalesQuantity: faker.number.int({ max: 1000, min: 5 }),
      isSoldOut: faker.helpers.arrayElement([true, false]),
    }));
}