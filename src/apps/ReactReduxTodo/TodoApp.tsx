import * as React from "react"
import {FC, useEffect, useState} from "react"
import {Checkbox, Input, List, Radio, Spin} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {CloseOutlined} from "@ant-design/icons/lib"
import classNames from "classnames"
import {addTodo, fetchTodos, removeTodo, toggleTodo} from "./todos/actionCreators"
import {setFilter} from "./filter/actionCreators"
import {selectFilteredTodos, selectTodoNeeded} from "./todos/selectors"
import '../styles.scss'
import {selectLoading} from "./loading/selectors"

const TodoApp: FC = () => {
  const dispatch = useDispatch()

  const todos = useSelector<TStore, TTodo[]>(selectFilteredTodos)
  const todoNeeded = useSelector<TStore, number>(selectTodoNeeded)
  const loading = useSelector<TStore, TLoading>(selectLoading)

  const [task, setTask] = useState<string>('')

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const onAddTodo = () => {
    dispatch(addTodo({
      text: task,
      state: 'todo'
    }))
    setTask('')
  }

  const onCheckTodo = (id: string) => {
    dispatch(toggleTodo(id))
  }

  const onRemoveTodo = (id: string) => {
    dispatch(removeTodo(id))
  }

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
      <h1>todos</h1>

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
            <List.Item className="todo-item">
              <span className="todo-left">
                <Checkbox checked={todo.state === 'done'} onChange={() => onCheckTodo(todo.id)}/>
                <span className={classNames('todo-text', {'done': todo.state === 'done'})}>
                  {todo.text}
                </span>
              </span>
              <span className="todo-right" onClick={() => onRemoveTodo(todo.id)}>
                <CloseOutlined/>
              </span>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  )
}

export default TodoApp
