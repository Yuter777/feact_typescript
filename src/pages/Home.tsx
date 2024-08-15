import React, { useState } from "react";
import { Button, Modal } from "antd";
import TodoList from "../components/TodoList";
import Filter from "../components/Filter";
import Search from "../components/Search";
import TodoForm from "../components/TodoForm";

const Home: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTodo = () => {
    Modal.confirm({
      title: "Add Todo",
      content: <TodoForm refreshTodos={() => {}} />,
    });
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <Search onSearch={setSearchQuery} />
      <Filter onFilterChange={setShowCompleted} />
      <TodoList showCompleted={showCompleted} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
