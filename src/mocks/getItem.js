import { faker } from "@faker-js/faker";

export default function getItem(mock) {
  const url = /^\/api\/v1\/item\/(\d+)$/;
  mock.onGet(url).reply((config) => {
    const urlSegments = config.url.split("/");
    const itemId = urlSegments[urlSegments.length - 1];

    const optionId = config?.params?.optionId;

    let status = 200;
    let data = { ...collection, id: itemId };

    if (config?.params && !!optionId) {
      // optionId가 존재하고 빈 문자열이 아닌 경우
      const selectedOption =
        collection.options.find((e) => e.id == optionId) ||
        collection.options[0];
      data = {
        id: itemId,
        itemName: collection?.itemName,
        originalPrice: parseInt(collection?.originalPrice),
        price: parseInt(collection?.price),
        thumbnail: collection.thumbnails[0]?.thumbnail,
        brand: {
          id: collection.brand.id,
          name: collection?.brand.name,
        },
        option: selectedOption,
      };
    }

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

  const sizes = new Array(4).fill().map((_, index) => faker.lorem.word());
  const colors = new Array(4).fill().map((_, index) => faker.lorem.word());

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

    options: sizes.flatMap((e) =>
      colors.map((c) => ({
        id: faker.number.int(),
        size: e,
        color: c,
        inventory: faker.number.int({ max: 5, min: 0 }),
        thumbnail: fakerSubImage(),
      })),
    ),

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
