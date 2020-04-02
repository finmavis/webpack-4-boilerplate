const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ROOT_DIRECTORY = process.cwd();

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
  },
  output: {
    path: path.resolve(ROOT_DIRECTORY, 'build'),
    filename: '[name].[contenthash:8].bundle.js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.resolve(ROOT_DIRECTORY, 'config/babel.config.js'),
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: '[name]__[local]--[contenthash:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: '[name]__[local]--[contenthash:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              limit: 4096,
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].bundle.css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      compressionOptions: { level: 9 },
      filename: '[path].gz[query]',
      minRatio: 0.8,
      test: /\.(js|css|html|svg)$/,
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
      filename: '[path].br[query]',
      minRatio: 0.8,
      test: /\.(js|css|html|svg)$/,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            comparisons: false,
            ecma: 5,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ascii_only: true,
            comments: false,
            ecma: 5,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false,
        },
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
              minifyFontValues: {
                removeQuotes: false,
              },
            },
          ],
        },
      }),
    ],
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
    },
  },
};