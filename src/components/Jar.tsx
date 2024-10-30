import React from "react";
import { Pie } from "react-chartjs-2";
import { Fruit } from "../types/Fruit";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

Chart.register(ArcElement);
Chart.register(Tooltip);

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

  const colorMap = fruits.reduce((acc, { fruit }, index) => {
    if (!acc[fruit.name]) {
      acc[fruit.name] = `hsl(${(index * 360) / fruits.length}, 70%, 50%)`;
    }
    return acc;
  }, {} as Record<string, string>);

  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const fruitCalories =
              pieChartData.datasets[0].data[tooltipItem.dataIndex];
            return `${
              pieChartData.labels[tooltipItem.dataIndex]
            }: ${fruitCalories} cal`;
          },
        },
      },
    },
  };

  const pieChartData = {
    labels: fruits.map(({ fruit }) => fruit.name),
    datasets: [
      {
        label: "Calories",
        data: fruits.map(
          ({ fruit, count }) => fruit.nutritions.calories * count
        ),
        backgroundColor: fruits.map(({ fruit }) => colorMap[fruit.name]),
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
      <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">
        Jar
      </h2>
      <div className="w-100 flex items-center justify-center h-64 mb-4">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
      <h3 className="text-lg dark:text-white text-center mb-4">
        Total Calories: {totalCalories}
      </h3>
      <div className="text-right">
        <Button
          disabled={fruits.length === 0}
          variant="destructive"
          className="border-red-600 bg-red-600 text-white py-2 px-4 rounded mb-4 disabled:cursor-not-allowed"
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
                  className="flex justify-between mb-2 dark:text-white p-2 border-b border-gray-50/10"
                >
                  <span
                    style={{ color: colorMap[fruit.name] }}
                    className="flex-1 text-left"
                  >
                    {fruit.name} (x{count}){" "}
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
