import React from "react";
import { List, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteTodo, editTodo } from "../api/todos";
import TodoForm from "./TodoForm";

const { confirm } = Modal;

interface TodoItemProps {
  todo: any;
  refreshTodos: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, refreshTodos }) => {
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    refreshTodos();
  };

  const handleEdit = () => {
    Modal.confirm({
      title: "Edit Todo",
      content: <TodoForm todo={todo} refreshTodos={refreshTodos} />,
      onOk() {
        refreshTodos();
      },
    });
  };

  const handleComplete = async () => {
    await editTodo(todo.id, { ...todo, completed: !todo.completed });
    refreshTodos();
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No, Cancel",
      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>,
        <Button type="dashed" danger onClick={showDeleteConfirm}>
          Delete
        </Button>,
        <Button onClick={handleComplete}>
          {todo.completed ? "Complete" : "Complete"}
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black",
              pointerEvents: todo.completed ? "none" : "auto",
            }}
          >
            {todo.title}
          </span>
        }
      />
    </List.Item>
  );
};

export default TodoItem;
