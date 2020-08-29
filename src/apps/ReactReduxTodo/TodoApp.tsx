import * as React from "react"
import {FC, useState} from "react"
import {Checkbox, Input, List, Radio} from "antd"
import {useDispatch, useSelector} from "react-redux"

import './styles.scss'
import {CloseOutlined} from "@ant-design/icons/lib"
import classNames from "classnames"
import {addTodo, removeTodo, setFilter, toggleTodo} from "./actionCrators"

const TodoApp: FC = () => {
  const dispatch = useDispatch()

  const todos = useSelector<TStore, TTodo[]>(
    state => {
      if (state.filter === 'all') {
        return state.todos
      }

      return state.todos.filter(todo => todo.state === state.filter)
    }
  );

  const [task, setTask] = useState<string>('');

  const onAddTodo = () => {
    dispatch(addTodo({
      text: task,
      state: 'todo'
    }))
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
      <span className="todo-needed">
        还剩2项 <span role="img" aria-label="Clap">🎉</span>
      </span>

      <Radio.Group onChange={e => onFilter(e.target.value)}
                   size="small"
                   defaultValue="all"
                   buttonStyle="solid"
      >
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

      <List
        className="todo-list"
        footer={footer}
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item>
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
    </div>
  )
}

export default TodoApp
