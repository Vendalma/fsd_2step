const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
};

const pagesDir = path.join(PATHS.src, '/pages');

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
      '@images': path.resolve(PATHS.src, 'assets/images'),
    },
  },
  context: PATHS.src,
  entry: createEntryPoints(),

  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].js`,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
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
          outputPath: `${PATHS.assets}fonts`,
          publicPath: `../fonts`,
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: `${PATHS.assets}images`,
          publicPath: `${PATHS.assets}images`,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              'postcssOptions': {
                'config': `./postcss.config.js`
              },
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: `${PATHS.src}/assets/scss/sass-patterns/*.scss`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
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
        from: `${PATHS.src}/${PATHS.assets}favicon`,
        to: `${PATHS.assets}favicon`
      },
      /*{
        from: `${PATHS.src}/${PATHS.assets}fonts`,
        to: `${PATHS.assets}fonts`
      },*/]
    })
  ],
};
