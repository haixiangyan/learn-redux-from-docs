import {Dispatch} from "redux"
import fetch from "../../../../api"
import {setLoading} from "../loading/actionCreators"
import {ADD_TODO, REMOVE_TODO, SET_TODOS, TOGGLE_TODO} from "./actionTypes"

const dbTodos: TTodo[] = [
  {
    id: '1',
    text: '抽烟',
    state: 'done'
  },
  {
    id: '2',
    text: '喝酒',
    state: 'todo'
  },
  {
    id: '3',
    text: '烫头',
    state: 'todo'
  }
]

export const fetchTodos = () => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '加载中...'}))

  const response: TTodo = await fetch('/fetchTodos', () => dbTodos)

  dispatch({ type: SET_TODOS, payload: response })

  dispatch(setLoading({status: false, tip: ''}))
}

export const addTodo = (newTodo: Partial<TTodo>) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '添加中...'}))

  const response: TTodo = await fetch('/addTodo', () => ({
    id: new Date().toISOString(),
    ...newTodo
  }))

  dispatch({ type: ADD_TODO, payload: response })

  dispatch(setLoading({status: false, tip: ''}))
}

export const removeTodo = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '移除中...'}))

  const response = await fetch('/removeTodo', () => id)

  dispatch({ type: REMOVE_TODO, payload: response })

  dispatch(setLoading({status: false, tip: ''}))
}

export const toggleTodo = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '修改状态中...'}))

  const response = await fetch('/toggleTodo', () => id)

  dispatch({ type: TOGGLE_TODO, payload: response })

  dispatch(setLoading({status: false, tip: ''}))
}
