import { faker } from "@faker-js/faker";

export default function getItem(mock) {
  const url = /^\/api\/v1\/item\/(\d+)$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
    let data = collection;

    return [status, data];
  });

  function fakerSubImage() {
    return require(
      `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
    );
  }
  function fakerMainImage() {
    return require(
      `assets/images/main/main${faker.number.int({ max: 38, min: 1 })}.jpg`,
    );
  }

  let collection = {
    id: faker.number.int(),

    itemCode: faker.string.uuid(),
    itemName: faker.commerce.productName(),
    thumbnails: new Array(faker.number.int({ max: 5, min: 1 }))
      .fill()
      .map((_, index) => ({
        id: faker.number.int(),
        thumbnail: fakerSubImage(),
      })),
    recommendedItems: new Array(8).fill().map((_, index) => ({
      id: faker.number.int(),
      thumbnail: fakerSubImage(),
    })),
    originalPrice: faker.commerce.price({
      min: 500000,
      max: 900000,
      dec: 0,
    }),
    price: faker.commerce.price({
      min: 1000,
      max: 499999,
      dec: 0,
    }),
    like: localStorage.getItem("tokens")
      ? faker.helpers.arrayElement([true, false])
      : false,
    likeCount: faker.number.int({ max: 1000, min: 5 }),
    description: faker.lorem.paragraph(),
    scheduledToArriveDate: faker.date.soon({ days: 10 }),
    detailContents: new Array(faker.number.int({ max: 10, min: 1 }))
      .fill()
      .map((_, index) => ({
        id: faker.number.int(),
        content: fakerMainImage(),
      })),
    reviewRate: faker.number.int({ max: 5, min: 1 }),
    colors: new Array(faker.number.int({ max: 10, min: 5 }))
      .fill()
      .map((_, index) => ({
        id: faker.number.int(),
        thumbnail: fakerSubImage(),
        name: faker.lorem.word(),
      })),
    sizes: new Array(faker.number.int({ max: 10, min: 0 }))
      .fill()
      .map((_, index) => ({
        id: faker.number.int(),
        inventory: faker.number.int({ max: 10, min: 0 }),
        size: faker.lorem.word(),
      })),
    brand: {
      id: faker.number.int(),
      name: faker.company.name(),
      position: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      responsiveEmail: faker.internet.email(),
      zipCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      copyright: faker.lorem.sentence(),
      thumbnail: fakerMainImage(),
      likeCount: faker.number.int({ max: 1000, min: 100 }),
      items: new Array(5).fill().map((_, index) => ({
        id: faker.number.int(),
        itemName: faker.commerce.productName(),
        originalPrice: faker.commerce.price({
          min: 500000,
          max: 900000,
          dec: 0,
        }),
        thumbnail: fakerSubImage(),
        price: faker.commerce.price({
          min: 1000,
          max: 499999,
          dec: 0,
        }),
      })),
    },
  };
}
