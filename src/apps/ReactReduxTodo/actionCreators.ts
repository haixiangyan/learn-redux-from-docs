import {Dispatch} from "redux"
import fetch from "../../api"

export const addTodo = (newTodo: Partial<TTodo>) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true))

  const response: TTodo = await fetch('/addTodo', () => ({
    id: new Date().toISOString(),
    ...newTodo
  }))

  dispatch({
    type: 'addTodo',
    payload: response
  })

  dispatch(setLoading(false))
}

export const removeTodo = (id: string) => ({
  type: 'removeTodo',
  payload: id
})

export const toggleTodo = (id: string) => ({
  type: 'toggleTodo',
  payload: id
})

export const setFilter = (filter: TFilter) => ({
  type: 'setFilter',
  payload: filter
})

export const setLoading = (loading: boolean) => ({
  type: 'setLoading',
  payload: loading
})
