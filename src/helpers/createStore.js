import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import axios from "axios"

import reducers from "../client/reducers"

// Create a seperate store without a Provider
// to prevent pre-rendering state errors
// export for use within index.js route handling 
export default (req) => {
    const axiosInstance = axios.create({
        baseURL: "http://react-ssr-api.herokuapp.com",
        headers: {
            cookie: req.get("cookie")  || ""
        }
    })
    const store = createStore(
        reducers,
         {},
          applyMiddleware(thunk.withExtraArgument(axiosInstance)))
    
    return store
}