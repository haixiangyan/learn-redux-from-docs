import {Dispatch} from "redux"
import fetch from "../../../api"
import {setLoading} from "./loading"

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

  const response: TTodo = await fetch('/addTodo', () => dbTodos)

  dispatch({
    type: 'setTodos',
    payload: response
  })

  dispatch(setLoading({status: false, tip: ''}))
}

export const addTodo = (newTodo: Partial<TTodo>) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '添加中...'}))

  const response: TTodo = await fetch('/addTodo', () => ({
    id: new Date().toISOString(),
    ...newTodo
  }))

  dispatch({
    type: 'addTodo',
    payload: response
  })

  dispatch(setLoading({status: false, tip: ''}))
}

export const removeTodo = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '移除中...'}))

  dispatch({
    type: 'removeTodo',
    payload: id
  })

  dispatch(setLoading({status: false, tip: ''}))
}

export const toggleTodo = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '修改状态中...'}))

  dispatch({
    type: 'toggleTodo',
    payload: id
  })

  dispatch(setLoading({status: false, tip: ''}))
}
