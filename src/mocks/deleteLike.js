export default function deleteLike(mock) {
  const url = /^\/api\/v1\/like\/(\d+)$/;
  mock.onDelete(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
