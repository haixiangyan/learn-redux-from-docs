import {SET_LOADING} from './actionTypes'

export const setLoading = (loading: TLoading) => ({
  type: SET_LOADING,
  payload: loading
})
