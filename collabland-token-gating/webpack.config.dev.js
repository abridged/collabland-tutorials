const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const mode = 'development';

module.exports = {
  mode,
  entry: './src/index.tsx',
  target: mode === 'development' ? 'web' : 'browserslist',
  devtool: 'inline-source-map',
  cache: {
    type: 'memory',
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
        exclude: /node_modules/,
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

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      REACT_APP_ENV: 'development',
      REACT_APP_API_URL: '',
      REACT_APP_LOGIN_URL: '',
      REACT_APP_COLLABLAND_KEY: '',
    }),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    https: false,
    host: 'localhost',
    port: 3000,
    client: {
      logging: 'info',
      progress: true,
      overlay: false,
    },
    open: true,
    historyApiFallback: true,
  },
};
