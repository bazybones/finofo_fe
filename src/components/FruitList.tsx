import React, { useState } from "react";
import { Fruit } from "../types/Fruit";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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
          <div key={key} className="mb-6">
            {groupBy !== "None" && (
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {groupBy}:{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {key}
                  </span>
                </h3>
                <Button
                  onClick={() => group.forEach(onAddFruit)}
                  variant="outline"
                  className="text-sm px-4 py-2 border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 rounded-md transition ease-in-out duration-150"
                >
                  Add All in {key}
                </Button>
              </div>
            )}
            <ul>
              {group.map((fruit) => (
                <li
                  key={fruit.id}
                  className="flex justify-between p-2 border-b"
                >
                  <span>
                    {fruit.name} ({fruit.nutritions.calories}cal)
                  </span>
                  <Button variant={"link"} onClick={() => onAddFruit(fruit)}>
                    Add to Jar
                  </Button>
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
        <Table>
          <TableCaption>A list of fruits with their details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Family</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Genus</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fruits.map((fruit) => (
              <TableRow key={fruit.id}>
                <TableCell className="border p-2">{fruit.name}</TableCell>
                <TableCell className="border p-2">{fruit.family}</TableCell>
                <TableCell className="border p-2">{fruit.order}</TableCell>
                <TableCell className="border p-2">{fruit.genus}</TableCell>
                <TableCell className="border p-2">
                  {fruit.nutritions.calories}
                </TableCell>
                <TableCell className="border p-2">
                  <Button
                    variant={"link"}
                    onClick={() => onAddFruit(fruit)}
                    className="ml-2"
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
            onClick={() => fruits.forEach(onAddFruit)}
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
