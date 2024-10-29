import React from "react";
import { Pie } from "react-chartjs-2";
import { Fruit } from "../types/Fruit";
import { Chart, ArcElement } from "chart.js";
import { ScrollArea } from "./ui/scroll-area";

Chart.register(ArcElement);

interface JarProps {
  fruits: Fruit[];
  setJar: React.Dispatch<React.SetStateAction<Fruit[]>>; // Add setJar prop
}

const Jar: React.FC<JarProps> = ({ fruits, setJar }) => {
  const totalCalories = fruits.reduce(
    (total, fruit) => total + fruit.nutritions.calories,
    0
  );

  // Generate unique colors
  const getUniqueColors = (numColors: number) => {
    const colors: Set<string> = new Set();
    while (colors.size < numColors) {
      colors.add(`hsl(${Math.random() * 360}, 70%, 50%)`);
    }
    return Array.from(colors);
  };

  const pieChartData = {
    labels: fruits.map((fruit) => fruit.name),
    datasets: [
      {
        label: "Calories",
        data: fruits.map((fruit) => fruit.nutritions.calories),
        backgroundColor: getUniqueColors(fruits.length),
      },
    ],
  };

  const handleRemoveFruit = (id: number) => {
    setJar((prevFruits) => {
      const index = prevFruits.findIndex((fruit) => fruit.id === +id);
      if (index !== -1) {
        return [...prevFruits.slice(0, index), ...prevFruits.slice(index + 1)];
      }
      return prevFruits;
    });
  };

  const handleRemoveAll = () => {
    setJar([]); // Clear all fruits from the jar
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
        <button
          className="bg-red-500 text-white  py-2 px-4 rounded mb-4"
          onClick={handleRemoveAll}
        >
          Remove All
        </button>
      </div>
      <ScrollArea className="h-[45rem] w-auto rounded-md border p-5">
        <div className="bg-white dark:bg-[#1d1d20] p-6 rounded-lg shadow-lg flex flex-col items-center">
          <ul className="mb-4 w-full">
            {fruits.length === 0 ? (
              <li className="dark:text-white text-center">
                No fruits added to the jar.
              </li>
            ) : (
              fruits.map((fruit) => (
                <li
                  key={fruit.id}
                  className="flex justify-between mb-2 dark:text-white p-2 border-b border-gray-300"
                >
                  <span>{fruit.name}</span>
                  <span>({fruit.nutritions.calories} cal)</span>
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => handleRemoveFruit(fruit.id)} // Remove fruit button
                  >
                    Remove
                  </button>
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
