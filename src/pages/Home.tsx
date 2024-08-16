import React, { useState } from "react";
import { Button, Flex, Modal } from "antd";
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
      <h2 className="center">TypeScript Todo</h2>
      <Flex gap="small" className="padded-container">
        <Search onSearch={setSearchQuery} />
        <Button type="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Flex>
      <Filter onFilterChange={setShowCompleted} />
      <TodoList showCompleted={showCompleted} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
