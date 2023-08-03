const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js", // relative path
  output: {
    path: path.join(__dirname, "public"), // absolute path
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/, // to run on every file that ends with .js
        exclude: /node_modules/, // to avoid the file node_modules
      },
      {
        test: /\.s?css$/, // to run on every file that ends with .scss
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true,
  },
};
