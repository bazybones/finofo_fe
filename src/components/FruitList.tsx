import React from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FruitListProps {
  fruits: Fruit[];
  onAddFruit: (fruit: Fruit) => void;
  groupBy: string | null;
  viewType: "list" | "table";
  setViewType: React.Dispatch<React.SetStateAction<"list" | "table">>;
}

const FruitList: React.FC<FruitListProps> = ({
  fruits,
  onAddFruit,
  groupBy,
  viewType,
  setViewType,
}) => {
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
  const listView = () => {
    return (
      <div>
        {Object.entries(groupedFruits).map(([key, group]) => (
          <div key={key} className="mb-6">
            {groupBy !== "None" ? (
              <Accordion type="multiple">
                <AccordionItem value={key}>
                  <AccordionTrigger>
                    <h3 className="text-xl">
                      {groupBy}: {key} (Total: {group.length})
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-end border-b border-gray-50/10 ">
                      <Button
                        onClick={() => group.forEach(onAddFruit)}
                        variant="outline"
                        className="mt-2 text-sm px-4 py-2 border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 rounded-md transition ease-in-out duration-150 mb-2"
                      >
                        Add All in {key}
                      </Button>
                    </div>
                    <ul>
                      {group.map((fruit) => (
                        <li
                          key={fruit.id}
                          className="flex justify-between items-center p-2 border-b border-gray-50/10"
                        >
                          <span>
                            {fruit.name} ({fruit.nutritions.calories} cal)
                          </span>
                          <Button
                            variant={"link"}
                            onClick={() => onAddFruit(fruit)}
                          >
                            Add to Jar
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className="bg-gray-100 dark:bg-transparent p-4 rounded-lg shadow-md mb-2">
                <ul>
                  {group.map((fruit) => (
                    <li
                      key={fruit.id}
                      className="flex justify-between p-2 border-b border-gray-50/10"
                    >
                      <span>
                        {fruit.name} ({fruit.nutritions.calories} cal)
                      </span>
                      <Button
                        variant={"link"}
                        onClick={() => onAddFruit(fruit)}
                      >
                        Add to Jar
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const tableView = () => {
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
              <TableRow className="border border-gray-50/10" key={fruit.id}>
                <TableCell className=" p-2">{fruit.name}</TableCell>
                <TableCell className=" p-2">{fruit.family}</TableCell>
                <TableCell className=" p-2">{fruit.order}</TableCell>
                <TableCell className=" p-2">{fruit.genus}</TableCell>
                <TableCell className=" p-2">
                  {fruit.nutritions.calories}
                </TableCell>
                <TableCell className="= p-2">
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
          className="mt-2 text-sm px-4 py-2 border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 rounded-md transition ease-in-out duration-150 mb-2"
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
      {viewType === "list" ? listView() : tableView()}
    </div>
  );
};

export default FruitList;
