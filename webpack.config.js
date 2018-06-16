/**
 * Created by YIM610 on 2018/5/22.
 *
 */

const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./dist")
    },
    mode: "development"
};