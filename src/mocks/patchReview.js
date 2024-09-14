export default function patchReview(mock) {
  const url = /^\/api\/v1\/review\/(\d+)$/;
  mock.onPatch(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
