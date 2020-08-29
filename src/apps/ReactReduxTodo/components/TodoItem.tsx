import * as React from "react"
import {FC} from "react"
import {Checkbox, List} from "antd"
import classNames from "classnames"
import {CloseOutlined} from "@ant-design/icons/lib"

interface IProps {
  todo: TTodo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const TodoItem: FC<IProps> = (props) => {
  const {todo, onToggle, onRemove} = props

  return (
    <List.Item className="todo-item">
      <span className="todo-left">
        <Checkbox checked={todo.state === 'done'} onChange={() => onToggle(todo.id)}/>
        <span className={classNames('todo-text', {'done': todo.state === 'done'})}>
          {todo.text}
        </span>
      </span>
      <span className="todo-right" onClick={() => onRemove(todo.id)}>
                <CloseOutlined/>
              </span>
    </List.Item>
  )
}

export default TodoItem
