const path = require("path")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.js")

const config = {
    // Tell webpack the root file of our
    // server application
    entry: "./src/client/index.js",

    // Tell webpack were to store the output file
    // that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    }
};

module.exports = merge(baseConfig, config)