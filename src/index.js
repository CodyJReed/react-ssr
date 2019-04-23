import express from "express"
import React from "react"
import {renderToString} from "react-dom/server"

import Home from "./client/components/Home"

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) =>{
    const content = renderToString( <Home />);
    
    res.send(content);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})