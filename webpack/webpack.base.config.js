const webpack = require("webpack");
const { resolve, join } = require("path");
const { readdirSync, readdir } = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: join(__dirname, "../src"),
  dist: join(__dirname, "../dist"),
};

const pages_folder = join(PATHS.src, "/pages");
const images_folder = join(PATHS.src, "/images");
const fonts_folder = join(PATHS.src, "/fonts");

const createHtmlWebpackPlugins = (pagesFolderPath) =>
  readdirSync(pagesFolderPath).map(
    (pageFolder) =>
      new HtmlWebpackPlugin({
        template: join(pagesFolderPath, pageFolder, `${pageFolder}.pug`),
        filename: `${pageFolder}.html`,
        chunks: [pageFolder],
      })
  );

const createEntryPoints = () => {
  const entryPoints = {};
  const pageNames = readdirSync(pages_folder);

  pageNames.forEach(
    (page) => (entryPoints[page] = join(pages_folder, page, `${page}.js`))
  );

  return entryPoints;
};

const CSS_loaders = ["style-loader", MiniCssExtractPlugin.loader, "css-loader"];

module.exports = {
  externals: {
    paths: PATHS,
  },
  resolve: {
    alias: {
      "@": PATHS.src,
      "@components": resolve(PATHS.src, "components"),
      "@layout": resolve(PATHS.src, "layout"),
      "@fonts": resolve(PATHS.src, "fonts"),
      "@images": resolve(PATHS.src, "images"),
    },
  },
  context: PATHS.src,
  entry: createEntryPoints(),

  output: {
    filename: "[name].js",
    path: PATHS.dist,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: "pug-loader",
          options: {
            root: PATHS.src,
          },
        },
      },
      {
        test: /\.(woff|ttf|svg)$/,
        exclude: [images_folder],
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts",
        },
      },
      {
        test: /.(png|jpg|gif|svg)$/,
        exclude: fonts_folder,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
        },
      },
      {
        test: /\.scss$/,
        use: [
          ...CSS_loaders,
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: PATHS.src + "/resources_sass/*.scss",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    ...createHtmlWebpackPlugins(pages_folder),
  ],
};
