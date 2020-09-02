import {createSelector} from '@reduxjs/toolkit'
import {selectFilter} from '../filter/selectors'

export const selectTodos = (state: TStore) => Object.values(state.todos.entities)

export const selectFilteredTodos = createSelector<TStore, TTodo[], TFilter, TTodo[]>(
  selectTodos,
  selectFilter,
  (todos: TTodo[], filter: TFilter) => {
    if (filter === 'all') {
      return todos
    }

    return todos.filter(todo => todo.state === filter)
  }
)

export const selectTodoNeeded = createSelector<TStore, TTodo[], number>(
  selectTodos,
  (todos: TTodo[]) => todos.filter(todo => todo.state === 'todo').length
)
