const { override } = require("customize-cra");

module.exports = override((config) => {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    "fs": false, // ✅ Prevents Webpack from trying to resolve 'fs'
  };
  return config;
});
