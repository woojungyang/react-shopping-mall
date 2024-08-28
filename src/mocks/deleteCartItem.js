export default function deleteCartItem(mock) {
  const url = /^\/api\/v1\/cart\/items$/;
  mock.onDelete(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
