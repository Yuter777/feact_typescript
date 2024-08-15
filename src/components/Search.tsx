import React from "react";
import { Input } from "antd";

const Search: React.FC<{ onSearch: (value: string) => void }> = ({
  onSearch,
}) => {
  return <Input.Search placeholder="Search Todos" onSearch={onSearch} />;
};

export default Search;
