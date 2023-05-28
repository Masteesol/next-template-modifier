const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "no"],
  },
  localePath: path.resolve("./public/locales"),
};
