const { override } = require("customize-cra");

module.exports = override((config) => {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    "path": require.resolve("path-browserify")  // ✅ Redirects 'path' to 'path-browserify'
  };
  return config;
});
