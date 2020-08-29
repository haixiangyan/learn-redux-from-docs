import {createStore} from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

store.subscribe(() => console.log('can you see me'))

export default store
