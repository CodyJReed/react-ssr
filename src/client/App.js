import React from "react"
import {renderRoutes} from "react-router-config"

import Header from "./components/Header"
import {fetchCurrentUser} from "./actions"

const App = ({route}) => (
    <dvi>
        <Header />
        {renderRoutes(route.routes)}
    </dvi>
)

export default {
    component: App,
    loadData: ({dispatch}) => dispatch(fetchCurrentUser())
}