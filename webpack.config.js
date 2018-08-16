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
                    presets: ["es2015", "react", "stage-0"],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                loaders: [
                    "style-loader",
                    "css-loader?modules&localIdentName=[name]-[hash:base64:5]",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./dist")
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx','.json'],
    }
};