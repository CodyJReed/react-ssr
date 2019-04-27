// import babel-polyfill helpers to
// avoid regeneratorRuntime errors
import "babel-polyfill"

import express from "express"
import {matchRoutes} from "react-router-config"
import proxy from "express-http-proxy"

import Routes from "./client/Routes"
import renderer from "./helpers/renderer"
import createStore from "./helpers/createStore"

const app = express()

app.use("/api", proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
        opts.headers["x-forwarded-host"] = "localhost:3000"
        return opts
    }
}))

app.use(express.static("public"));

app.get("*", (req, res) =>{
    const store = createStore(req)

    const promises = matchRoutes(Routes, req.path).map( ({route}) => route.loadData ? route.loadData(store) : null)
    
    Promise.all(promises).then(() => {
        res.send(renderer(store, req));
    })

})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})