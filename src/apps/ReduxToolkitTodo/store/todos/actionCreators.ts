import fetch from '../../../../api'
import loadingSlice from '../loading/slice'
import {ADD_TODO, FETCH_TODOS, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO} from './actionTypes'
import {createAsyncThunk, Update} from '@reduxjs/toolkit'

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
  type: string;
  payload: TTodo[];
}

export type TAddTodoAction = {
  type: string;
  payload: TTodo;
}

export type TRemoveTodoAction = {
  type: string;
  payload: string;
}

export type TUpdateTodoAction = {
  type: string;
  payload: Update<TTodo>
}

export type TToggleTodoAction = {
  type: string;
  payload: string;
}

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

export const updateTodo = createAsyncThunk<Update<TTodo>, Update<TTodo>>(
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
