const path = require("path")
const merge = require("webpack-merge")
const webpackNodeExternals = require("webpack-node-externals")
const baseConfig = require("./webpack.base.js")

const config = {
    // Inform webpack that we're buidling a bundle 
    // for nodeJS, rather than for the browser
    target: "node",

    // Tell webpack the root file of our
    // server application
    entry: "./src/index.js",

    // Tell webpack were to store the output file
    // that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },

    // Tell webpack to exclude libraries found in server-side node_modules
    // when creating output bundle
    externals: [
        webpackNodeExternals()
    ],
};

module.exports = merge(baseConfig, config)