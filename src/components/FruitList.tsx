import React, { useState } from "react";
import { Fruit } from "../types/Fruit";
import { Button } from "./ui/button";

interface FruitListProps {
  fruits: Fruit[];
  onAddFruit: (fruit: Fruit) => void;
  groupBy: string | null;
}

const FruitList: React.FC<FruitListProps> = ({
  fruits,
  onAddFruit,
  groupBy,
}) => {
  const [viewType, setViewType] = useState<"list" | "table">("list");

  const groupFruits = () => {
    if (!groupBy || groupBy === "None") {
      return { None: fruits };
    }

    return fruits.reduce((acc: Record<string, Fruit[]>, fruit: Fruit) => {
      const key = String(fruit[groupBy.toLowerCase() as keyof Fruit]);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(fruit);
      return acc;
    }, {} as Record<string, Fruit[]>);
  };

  const groupedFruits = groupFruits();
  const renderListView = () => {
    return (
      <div>
        {Object.entries(groupedFruits).map(([key, group]) => (
          <div key={key} className="mb-4">
            {groupBy !== "None" && (
              <h3 className="font-bold text-lg">
                {groupBy}: {key}
              </h3>
            )}
            <ul>
              {group.map((fruit) => (
                <li
                  key={fruit.id}
                  className="flex justify-between p-2 border-b"
                >
                  <span>{fruit.name}</span>
                  <button onClick={() => onAddFruit(fruit)}>Add to Jar</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderTableView = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-lg">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Family</th>
              <th className="border p-2">Order</th>
              <th className="border p-2">Genus</th>
              <th className="border p-2">Calories</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map((fruit) => (
              <tr key={fruit.id}>
                <td className="border p-2">{fruit.name}</td>
                <td className="border p-2">{fruit.family}</td>
                <td className="border p-2">{fruit.order}</td>
                <td className="border p-2">{fruit.genus}</td>
                <td className="border p-2">{fruit.nutritions.calories}</td>
                <td className="border p-2">
                  <Button
                    variant={"link"}
                    onClick={() => onAddFruit(fruit)}
                    className="ml-2"
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const toggleView = () => {
    setViewType((prev) => (prev === "list" ? "table" : "list"));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button
          variant={"outline"}
          onClick={toggleView}
          className="py-2 px-4 text-black dark:text-white rounded"
        >
          Switch to {viewType === "list" ? "Table" : "List"} View
        </Button>
        {groupBy && (
          <Button
            variant={"default"}
            onClick={() => fruits.forEach(onAddFruit)} // Add all fruits in the group
            className="py-2 px-4 text-white dark:text-black rounded"
          >
            Add All
          </Button>
        )}
      </div>
      {viewType === "list" ? renderListView() : renderTableView()}
    </div>
  );
};

export default FruitList;
