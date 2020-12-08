const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
};

const pagesDir = path.join(PATHS.src, '/pages');
const imagesDir = path.join(PATHS.src, '/images');
const fontsDir = path.join(PATHS.src, '/fonts');
const faviconDir = path.join(PATHS.src, '/favicon')

const createHtmlWebpackPlugins = (pagesFolderPath) =>
  fs.readdirSync(pagesFolderPath).map(
    (pageFolder) =>
      new HtmlWebpackPlugin({
        template: path.join(pagesFolderPath, pageFolder, `${pageFolder}.pug`),
        filename: `${pageFolder}.html`,
        chunks: [pageFolder],
      })
  );

const createEntryPoints = () => {
  const entryPoints = {};
  const pageNames = fs.readdirSync(pagesDir);
  pageNames.forEach(
    (page) => (entryPoints[page] = path.join(pagesDir, page, `${page}.js`))
  );

  return entryPoints;
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  resolve: {
    alias: {
      '@': PATHS.src,
      '@components': path.resolve(PATHS.src, 'components'),
      '@layout': path.resolve(PATHS.src, 'layout'),
      '@fonts': path.resolve(PATHS.src, 'fonts'),
      '@images': path.resolve(PATHS.src, 'images'),
    },
  },
  context: PATHS.src,
  entry: createEntryPoints(),

  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            root: PATHS.src,
          },
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: PATHS.src + '/sass-patterns/*.scss',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': "jquery'",
      'window.$': 'jquery',
    }),
    ...createHtmlWebpackPlugins(pagesDir),
    new CopyWebpackPlugin({
      patterns: [{
        from: `${faviconDir}`,
        to: `${PATHS.dist}/favicon`
      }]
    })
  ],
};
