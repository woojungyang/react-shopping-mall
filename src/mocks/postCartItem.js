export default function postCartItem(mock) {
  const url = /^\/api\/v1\/cart\/item\/(\d+)$/;
  mock.onPost(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
