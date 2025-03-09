const { override } = require("customize-cra");

module.exports = override((config) => {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    "path": false // ✅ Tells Webpack to NOT try polyfilling 'path'
  };
  return config;
});
