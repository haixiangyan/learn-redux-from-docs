import {SET_FILTER} from "./actionTypes"

type THandlerMapper = {[key: string]: (filter: TFilter, action: any) => TFilter}

const initFilter: TFilter = 'all'

const filterReducer = (filter: TFilter = initFilter, action: any) => {
  const handlerMapper: THandlerMapper = {
    [SET_FILTER]: (filter, action) => {
      return action.payload
    }
  }

  const handler = handlerMapper[action.type]

  return handler ? handler(filter, action) : filter
}

export default filterReducer
