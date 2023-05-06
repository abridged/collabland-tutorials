const webpack = require('webpack');
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin(); //not support html-webpack-plugin
// const deps = require('./package.json').dependencies;
const folderName = new Date().getTime();

module.exports = {
  mode: 'production',
  entry: [
    // must be first entry to properly set public path
    path.resolve(__dirname, 'src/index.tsx'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  output: {
    path: path.resolve(__dirname, 'dist/' + folderName + '/'),
    publicPath: './' + folderName + '/',
    filename: '[name].[contenthash].js',
    chunkFilename: 'vender.[id].chunk.js',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    // new WebpackMd5Hash(),

    // Load in Environment Plugin
    new webpack.EnvironmentPlugin(['REACT_APP_ENV', 'REACT_APP_LOGIN_URL', 'REACT_APP_API_SERVER_URL']),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      // chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      filename: '../index.html',
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')],
        },
        context: '/',
      },
    }),
    new NodePolyfillPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 512000,
      minRemainingSize: 0,
      minChunks: 1,
      automaticNameDelimiter: '~',
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        // loader: 'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react', '@babel/typescript'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
    // fallback: {
    //   util: require.resolve('util/'),
    //   crypto: require.resolve('crypto-browserify'),
    //   assert: require.resolve('assert/'),
    //   stream: require.resolve('stream-browserify'),
    //   fs: require.resolve('fs'),
    // },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
