import {applyMiddleware, createStore} from "redux"
import reducer from "./reducers"
import ReduxThunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension/index"

const middlewares = applyMiddleware(ReduxThunk)

const enhancer = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  middlewares
) : middlewares

const store = createStore(reducer, enhancer)

export default store
