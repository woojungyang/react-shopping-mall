export default function postCartItems(mock) {
  const url = /^\/api\/v1\/cart\/items$/;
  mock.onPost(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
