import * as React from "react"
import {FC, useState} from "react"
import {Checkbox, Input, List, Radio} from "antd"
import {useSelector} from "react-redux"

import './styles.scss'
import {CloseOutlined} from "@ant-design/icons/lib"
import classNames from "classnames"

const TodoApp: FC = () => {
  const todos = useSelector<TStore, TTodo[]>(state => state.todos);

  const [task, setTask] = useState<string>('');

  const onCheckTodo = () => {

  }

  const footer = (
    <div className="footer">
      <span className="todo-needed">
        还剩2项 <span role="img" aria-label="Clap">🎉</span>
      </span>

      <Radio.Group size="small" defaultValue="all" buttonStyle="solid">
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
      />

      <List
        className="todo-list"
        footer={footer}
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item>
            <span className="todo-left">
              <Checkbox checked={todo.state === 'done'} onChange={onCheckTodo}/>
              <span className={classNames('todo-text', {'done': todo.state === 'done'})}>
                {todo.text}
              </span>
            </span>
            <span className="todo-right">
              <CloseOutlined/>
            </span>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TodoApp
