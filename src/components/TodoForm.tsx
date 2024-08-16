import React, { useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import { addTodo, editTodo } from "../api/todos";

const TodoForm: React.FC<{ todo?: any; refreshTodos: () => void }> = ({
  todo,
  refreshTodos,
}) => {
  const [title, setTitle] = useState(todo?.title || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleSubmit = async () => {
    if (todo) {
      await editTodo(todo.id, { title, completed });
    } else {
      await addTodo({ title, completed });
    }
    refreshTodos();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item label="Completed">
        <Switch checked={completed} onChange={setCompleted} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default TodoForm;
