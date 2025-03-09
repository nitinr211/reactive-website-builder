const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "path": require.resolve("path-browserify"),  // ✅ Fix Webpack resolution
  })
);
