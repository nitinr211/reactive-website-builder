const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      "path": false  // ✅ Disables Webpack from trying to polyfill 'path'
    }
  }
};
