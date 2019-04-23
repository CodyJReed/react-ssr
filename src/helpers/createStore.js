import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"

// Create a seperate store without a Provider
// to prevent pre-rendering state errors
// export for use within index.js route handling 
export default () => {
    const store = createStore(reducers, {}, applyMiddleware(thunk))
    
    return store
}