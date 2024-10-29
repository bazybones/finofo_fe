import React from "react";
import { Pie } from "react-chartjs-2";
import { Fruit } from "../types/Fruit";
import { Chart, ArcElement } from "chart.js";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

Chart.register(ArcElement);

interface JarProps {
  fruits: { fruit: Fruit; count: number }[];
  setJar: React.Dispatch<
    React.SetStateAction<{ fruit: Fruit; count: number }[]>
  >;
}

const Jar: React.FC<JarProps> = ({ fruits, setJar }) => {
  const totalCalories = fruits.reduce(
    (total, { fruit, count }) => total + fruit.nutritions.calories * count,
    0
  );

  const getUniqueColors = (numColors: number) => {
    const colors: Set<string> = new Set();
    while (colors.size < numColors) {
      colors.add(`hsl(${Math.random() * 360}, 70%, 50%)`);
    }
    return Array.from(colors);
  };

  const pieChartData = {
    labels: fruits.map(({ fruit }) => fruit.name),
    datasets: [
      {
        label: "Calories",
        data: fruits.map(
          ({ fruit, count }) => fruit.nutritions.calories * count
        ),
        backgroundColor: getUniqueColors(fruits.length),
      },
    ],
  };

  const handleRemoveFruit = (fruitToRemove: Fruit) => {
    setJar((prevFruits) => {
      const existingFruit = prevFruits.find(
        (item) => item.fruit.id === fruitToRemove.id
      );
      if (existingFruit) {
        if (existingFruit.count > 1) {
          return prevFruits.map((item) =>
            item.fruit.id === fruitToRemove.id
              ? { ...item, count: item.count - 1 }
              : item
          );
        }

        return prevFruits.filter((item) => item.fruit.id !== fruitToRemove.id);
      }
      return prevFruits;
    });
  };

  const handleRemoveAll = () => {
    setJar([]);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white text-center">
        Jar
      </h2>
      <div className="w-full flex items-center justify-center h-64 mb-4">
        <Pie data={pieChartData} options={{ responsive: true }} />
      </div>
      <h3 className="text-lg dark:text-white text-center mb-4">
        Total Calories: {totalCalories}
      </h3>
      <div className="text-right">
        <Button
          variant={"destructive"}
          className=" text-white py-2 px-4 rounded mb-4"
          onClick={handleRemoveAll}
        >
          Remove All
        </Button>
      </div>
      <ScrollArea className="h-[41.8rem] w-auto rounded-md border p-5">
        <div className="dark:bg-[#1d1d20] p-6 flex flex-col items-center">
          <ul className="mb-4 w-full">
            {fruits.length === 0 ? (
              <li className="dark:text-white text-center">
                No fruits added to the jar.
              </li>
            ) : (
              fruits.map(({ fruit, count }) => (
                <li
                  key={`${fruit.id}-${count}`}
                  className="flex justify-between mb-2 dark:text-white p-2 border-b border-gray-300"
                >
                  <span className="flex-1 text-left">
                    {fruit.name} (x{count})
                  </span>
                  <span className="whitespace-nowrap text-center">
                    {fruit.nutritions.calories * count} cal
                  </span>
                  <Button
                    variant={"link"}
                    className="text-red-500 ml-4"
                    onClick={() => handleRemoveFruit(fruit)}
                  >
                    Remove
                  </Button>
                </li>
              ))
            )}
          </ul>
        </div>
      </ScrollArea>
    </>
  );
};

export default Jar;
