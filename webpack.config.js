const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isProduction = env === "production";

  return {
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
          // use: ["style-loader", "css-loader", "sass-loader"],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      historyApiFallback: true,
    },
  };
};
