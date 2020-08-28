import {createStore} from "redux"

const initState = {
  email: '',
  password: '',
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'setEmail':
      return {
        ...state,
        email: action.email
      }
    case 'setPassword':
      return {
        ...state,
        password: action.password
      }
  }
}

const store = createStore(reducer)

store.subscribe(() => console.log('can you see me'))

export default store
