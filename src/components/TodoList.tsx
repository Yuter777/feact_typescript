import React, { useEffect, useState } from "react";
import { List, Pagination } from "antd";
import TodoItem from "./TodoItem";
import { getTodos } from "../api/todos";

interface TodoListProps {
  showCompleted: boolean;
  searchQuery: string;
}

const TodoList: React.FC<TodoListProps> = ({ showCompleted, searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // 7 items per page

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
  const paginatedTodos = todos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List
        dataSource={paginatedTodos}
        renderItem={(todo) => (
          <TodoItem todo={todo} refreshTodos={fetchTodos} />
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={todos.length}
        onChange={handlePageChange}
      />
    </>
  );
};

export default TodoList;
