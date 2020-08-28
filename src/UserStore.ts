import {createStore} from "redux"

type TUser = {
  email: string;
  password: string;
}

const initState: TUser = {
  email: '',
  password: '',
}

const reducer = (state = initState, action: any) => {
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
    default:
      return initState
  }
}

const store = createStore(reducer)

store.subscribe(() => console.log('can you see me'))

export default store
