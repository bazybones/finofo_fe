import React from "react";
import { Fruit } from "./../../types/Fruit";

interface ListItemProps {
  fruit: Fruit;
  onAdd: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ fruit, onAdd }) => {
  return (
    <li className="flex justify-between items-center p-4 hover:bg-gray-100">
      <span>
        {fruit.name} ({fruit.nutritions.calories} kcal)
      </span>
      <button
        className="px-2 py-1 text-blue-500 hover:underline"
        onClick={onAdd}
      >
        Add
      </button>
    </li>
  );
};

export default ListItem;
