import React from "react"
import {renderRoutes} from "react-router-config"

const App = ({route}) => (
    <dvi>
        <h1>I'm a Header</h1>
        {renderRoutes(route.routes)}
    </dvi>
)

export default {
    component: App
}