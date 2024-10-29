// src/components/FruitList.tsx
import React from "react";
import { Fruit } from "../types/Fruit";

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
  const groupFruits = () => {
    if (!groupBy || groupBy === "None") {
      return { None: fruits };
    }

    return fruits.reduce((acc: Record<string, Fruit[]>, fruit: Fruit) => {
      // Access the grouping property safely
      const key = String(fruit[groupBy.toLowerCase() as keyof Fruit]); // Convert to string
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(fruit);
      return acc;
    }, {} as Record<string, Fruit[]>);
  };

  const groupedFruits = groupFruits();

  return (
    <div>
      {Object.entries(groupedFruits).map(([key, group]) => (
        <div key={key} className="mb-4">
          <h3 className="font-bold text-lg">{key}</h3>
          <ul>
            {group.map((fruit) => (
              <li key={fruit.id} className="flex justify-between p-2 border-b">
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

export default FruitList;
