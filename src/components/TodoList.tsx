import React, { useEffect, useState } from "react";
import { List } from "antd";
import TodoItem from "./TodoItem";
import { getTodos } from "../api/todos";

interface TodoListProps {
  showCompleted: boolean;
  searchQuery: string;
}

const TodoList: React.FC<TodoListProps> = ({ showCompleted, searchQuery }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [showCompleted, searchQuery]);

  const fetchTodos = async () => {
    const todos = await getTodos();
    const filteredTodos = todos.filter((todo: any) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCompleted = showCompleted || !todo.completed;
      return matchesSearch && matchesCompleted;
    });
    setTodos(filteredTodos);
  };

  return (
    <List
      dataSource={todos}
      renderItem={(todo) => <TodoItem todo={todo} refreshTodos={fetchTodos} />}
    />
  );
};

export default TodoList;
