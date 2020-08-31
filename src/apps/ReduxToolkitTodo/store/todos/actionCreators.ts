import fetch from "../../../../api"
import loadingSlice from '../loading/slice'
import {ADD_TODO, FETCH_TODOS, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO} from './actionTypes'
import {createAsyncThunk} from "@reduxjs/toolkit"

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

export const fetchTodos = createAsyncThunk<TTodo[]>(
  'todos/' + FETCH_TODOS,
  async (_, {dispatch}) => {
    dispatch(setLoading({status: true, tip: '加载中...'}))

    const response: TTodo[] = await fetch('/fetchTodos', () => dbTodos)

    dispatch(setLoading({status: false, tip: ''}))

    return response
  }
)

export const addTodo = createAsyncThunk<TTodo, Partial<TTodo>>(
  'todos/' + ADD_TODO,
  async (newTodo, {dispatch}) => {
    dispatch(setLoading({status: true, tip: '添加中...'}))

    const response: TTodo = await fetch('/addTodo', () => ({
      id: new Date().toISOString(),
      ...newTodo
    }))

    dispatch(setLoading({status: false, tip: ''}))

    return response
  }
)

export const removeTodo = createAsyncThunk<string, string>(
  'todos/' + REMOVE_TODO,
  async (id, {dispatch}) => {
    dispatch(setLoading({status: true, tip: '移除中...'}))

    const response = await fetch('/removeTodo', () => id)

    dispatch(setLoading({status: false, tip: ''}))

    return response
  }
)

export const updateTodo = createAsyncThunk<TTodo, TTodo>(
  'todos/' + UPDATE_TODO,
  async (newTodo, {dispatch}) => {
    dispatch(setLoading({status: true, tip: '更新中...'}))

    const response = await fetch('/updateTodo', () => newTodo)

    dispatch(setLoading({status: false, tip: ''}))

    return response
  }
)

export const toggleTodo = createAsyncThunk<string, string>(
  'todos/' + TOGGLE_TODO,
  async (id, {dispatch}) => {
    dispatch(setLoading({status: true, tip: '更新状态...'}))

    const response = await fetch('/toggleTodo', () => id)

    dispatch(setLoading({status: false, tip: ''}))

    return response
  }
)
