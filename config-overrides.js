const { override, addWebpackResolve } = require("customize-cra");

module.exports = override(
  addWebpackResolve({
    fallback: {
      "path": require.resolve("path-browserify")  // ✅ Redirects 'path' to 'path-browserify'
    }
  })
);
