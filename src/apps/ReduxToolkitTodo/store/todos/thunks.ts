import {createAsyncThunk} from '@reduxjs/toolkit'
import todosSlice from './slice'
import fetch from '../../../../api'

const {fetchTodos} = todosSlice.actions

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

export const fetchTodosThunk = createAsyncThunk(
  fetchTodos.toString(),
  async (_, {dispatch}) => {
    const response: TTodo[] = await fetch('/fetchTodos', () => dbTodos)
    return response
  }
)
