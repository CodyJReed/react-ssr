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

    const promises = matchRoutes(Routes, req.path)
    .map( ({route}) => route.loadData ? route.loadData(store) : null)
    .map(promise => {
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve)
            })
        }
    })
    
    Promise.all(promises).then(() => {
        const context = {}
        const content = renderer(store, req, context)
        
        if (context.url) {
            return res.redirect(context.url)
        }
        if (context.notFound) {
          res.status(404);
        }
        res.send(content)
    })

})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})