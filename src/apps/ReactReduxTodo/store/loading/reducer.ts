import {SET_LOADING} from "./actionTypes"

type THandlerMapper = {[key: string]: (loading: TLoading, action: any) => TLoading}

const initLoading: TLoading = {
  status: false,
  tip: ''
}

const loadingReducer = (loading = initLoading, action: any) => {
  const handlerMapper: THandlerMapper = {
    [SET_LOADING]: (loading, action) => {
      return {...loading, ...action.payload}
    }
  }

  const handler = handlerMapper[action.type]

  return handler ? handler(loading, action) : loading
}

export default loadingReducer
