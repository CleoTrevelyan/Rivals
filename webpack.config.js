// filepath: /c:/Users/block/OneDrive/Documents/Rivals/MVP/MVP App/Rivals/frontend/webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  return config;
};