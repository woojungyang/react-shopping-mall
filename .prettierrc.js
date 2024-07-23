module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "^react/(.*)$",
    "^app/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^hooks/(.*)$",
    "^pages/(.*)$",
    "^components/(.*)$",
    "^utilities/(.*)$",
    "^assets/(.*)$",
    "^styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
