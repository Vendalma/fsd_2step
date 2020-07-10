const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

//const pages_for_public_path = "/fsd_2step/dist";

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",

  output: {
    filename: "[name].js",
    path: baseWebpackConfig.externals.paths.dist,
    // publicPath: pages_for_public_path,
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
