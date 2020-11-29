const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  output: {
    filename: '[name].js',
    path: baseWebpackConfig.externals.paths.dist,
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
