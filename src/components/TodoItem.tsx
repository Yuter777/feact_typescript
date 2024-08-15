import React from "react";
import { List, Button, Modal, Checkbox } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteTodo, editTodo } from "../api/todos";
import TodoForm from "./TodoForm";

const { confirm } = Modal;

interface CheckboxChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { checked: boolean };
}

const TodoItem: React.FC<{ todo: any; refreshTodos: () => void }> = ({
  todo,
  refreshTodos,
}) => {
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

  // const handleCheck = async (e: CheckboxChangeEvent) => {
  //   await editTodo(todo.id, { ...todo, completed: e.target.checked });
  //   refreshTodos();
  // };

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
      ]}
    >
      <Checkbox checked={todo.completed} />
      <List.Item.Meta
        title={todo.title}
        description={`Completed: ${todo.completed}`}
      />
    </List.Item>
  );
};

export default TodoItem;
