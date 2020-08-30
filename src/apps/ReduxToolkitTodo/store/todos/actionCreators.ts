import {Dispatch} from "redux"
import fetch from "../../../../api"
import loadingSlice from '../loading/slice'
import {ADD_TODO, REMOVE_TODO, FETCH_TODOS, TOGGLE_TODO, UPDATE_TODO} from './actionTypes'

const {setLoading} = loadingSlice.actions

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

export type TSetTodosAction = {
  type: FETCH_TODOS;
  payload: TTodo[];
}

export type TAddTodoAction = {
  type: ADD_TODO;
  payload: TTodo;
}

export type TRemoveTodoAction = {
  type: REMOVE_TODO;
  payload: string;
}

export type TUpdateTodoAction = {
  type: UPDATE_TODO;
  payload: {
    id: string;
    text: string
  }
}

export type TToggleTodoAction = {
  type: TOGGLE_TODO;
  payload: string;
}

export type TTodoAction = TSetTodosAction | TAddTodoAction | TRemoveTodoAction | TUpdateTodoAction | TToggleTodoAction

export const fetchTodos = () => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '加载中...'}))

  const response: TTodo = await fetch('/fetchTodos', () => dbTodos)

  dispatch({ type: FETCH_TODOS, payload: response })

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

export const updateTodo = (id: string, text: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '更新中...'}))

  const response = await fetch('/updateTodo', () => ({ id, text }))

  dispatch({ type: UPDATE_TODO, payload: response })

  dispatch(setLoading({status: false, tip: ''}))
}

export const toggleTodo = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading({status: true, tip: '更新状态...'}))

  const response = await fetch('/toggleTodo', () => id)

  dispatch({ type: TOGGLE_TODO, payload: response })

  dispatch(setLoading({status: false, tip: ''}))
}
