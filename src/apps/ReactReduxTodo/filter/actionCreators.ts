import {Dispatch} from "redux"
import {setLoading} from "../loading/actionCreators"

export const setFilter = (filter: TFilter) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '加载中...'}))

  dispatch({
    type: 'setFilter',
    payload: filter
  })

  dispatch(setLoading({status: false, tip: ''}))
}
