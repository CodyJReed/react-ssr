const express = require("express");
const React = require("react");
const renderToString = require("react-dom/server").renderToString;

const Home = require("./client/components/Home").default

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) =>{
    const content = renderToString( <Home />);
    
    res.send(content);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})