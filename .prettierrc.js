module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "^react/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^hooks/(.*)$",
    "^pages/(.*)$",
    "^app/(.*)$",
    "^assets/(.*)$",
    "^components/(.*)$",
    "^utilities/(.*)$",
    "^asserts/(.*)$",
    "^styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
