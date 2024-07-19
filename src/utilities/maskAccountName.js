export function maskAccountName(accountName = "") {
  return accountName.replace(
    /^(.{3})(.*)$/,
    (match, p1, p2) => p1 + "*".repeat(p2.length),
  );
}
