const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  target:"node",
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.vue',
      '.json'
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
      extensions: ['.ts', '.js']
    })
  ],
};