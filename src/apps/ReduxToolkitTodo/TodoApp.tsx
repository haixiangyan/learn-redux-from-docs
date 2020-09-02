import * as React from "react"
import {FC, useCallback, useEffect, useState} from "react"
import {Input, List, Radio, Spin} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {addTodo, fetchTodos, removeTodo, toggleTodo, updateTodo} from './store/todos/actionCreators'
import {selectFilteredTodos, selectTodoNeeded} from "./store/todos/selectors"
import {selectLoading} from "./store/loading/selectors"
import TodoItem from "./components/TodoItem"
import filterSlice from './store/filter/slice'

const {setFilter} = filterSlice.actions

const TodoApp: FC = () => {
  const dispatch = useDispatch()

  const todos = useSelector<TStore, TTodo[]>(selectFilteredTodos)
  const todoNeeded = useSelector<TStore, number>(selectTodoNeeded)
  const loading = useSelector<TStore, TLoading>(selectLoading)

  const [task, setTask] = useState<string>('')

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const onAddTodo = () => {
    dispatch(addTodo({
      text: task,
      state: 'todo'
    }))
    setTask('')
  }

  const onToggleTodo = useCallback((id: string) => {
    dispatch(toggleTodo(id))
  }, [dispatch])

  const onRemoveTodo = useCallback((id: string) => {
    dispatch(removeTodo(id))
  }, [dispatch])

  const onUpdateTodo = useCallback(async (id: string, text: string, state: TFilter) => {
    await dispatch(updateTodo({
      id,
      text,
      state
    }))
  }, [dispatch])

  const onFilter = (filter: TFilter) => {
    dispatch(setFilter(filter))
  }

  const footer = (
    <div className="footer">
      {todoNeeded > 0 &&
      <span className="todo-needed">
          还剩{todoNeeded}项 <span role="img" aria-label="Clap">🎉</span>
        </span>
      }

      <Radio.Group onChange={e => onFilter(e.target.value)}
                   size="small"
                   defaultValue="all"
                   buttonStyle="solid">
        <Radio.Button className="filter-item" value="all">全部</Radio.Button>
        <Radio.Button className="filter-item" value="done">已完成</Radio.Button>
        <Radio.Button className="filter-item" value="todo">待完成</Radio.Button>
      </Radio.Group>
    </div>
  )

  return (
    <div className="app">
      <h1>redux-toolkit todos</h1>

      <Input size="large"
             placeholder="今天想干嘛"
             value={task}
             onChange={e => setTask(e.target.value)}
             onPressEnter={onAddTodo}
      />

      <Spin spinning={loading.status} tip={loading.tip}>
        <List
          className="todo-list"
          footer={footer}
          bordered
          dataSource={todos}
          renderItem={todo => (
            <TodoItem onRemove={onRemoveTodo} onToggle={onToggleTodo} onSave={onUpdateTodo} todo={todo}/>
          )}
        />
      </Spin>
    </div>
  )
}

export default TodoApp
