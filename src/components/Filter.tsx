import React from "react";
import { Checkbox } from "antd";

const Filter: React.FC<{ onFilterChange: (completed: boolean) => void }> = ({
  onFilterChange,
}) => {
  return (
    <Checkbox onChange={(e) => onFilterChange(e.target.checked)}>
      Show Completed
    </Checkbox>
  );
};

export default Filter;
