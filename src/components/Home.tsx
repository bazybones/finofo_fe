import React, { useState } from "react";
import useFetchFruits from "./../hooks/fetchFruits";
import Layout from "./ui/Layout";
import { Skeleton } from "./ui/Skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { FaExclamation } from "react-icons/fa";
import GroupBy from "./GroupBy";
import FruitList from "./FruitList";
import { ScrollArea } from "./ui/scroll-area";
import { Fruit } from "@/types/Fruit";
import Jar from "./Jar";

const Home: React.FC = () => {
  const { fruits, loading, error } = useFetchFruits();
  const [groupBy, setGroupBy] = useState<string | null>("None");
  const [jar, setJar] = useState<{ fruit: Fruit; count: number }[]>([]);
  const [viewType, setViewType] = useState<"list" | "table">("list");

  const handleAddFruitToJar = (fruit: Fruit) => {
    setJar((prevJar) => {
      const existingFruit = prevJar.find((item) => item.fruit.id === fruit.id);
      if (existingFruit) {
        return prevJar.map((item) =>
          item.fruit.id === fruit.id ? { ...item, count: item.count + 1 } : item
        );
      }

      return [...prevJar, { fruit, count: 1 }];
    });
  };

  const leftContent = () => (
    <div className="text-black dark:text-white">
      {loading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="gap-4">
            <Skeleton
              className={`${
                index === 0 ? `h-16 w-auto mb-2` : "h-[40rem] w-auto"
              }`}
              key={index}
            />
          </div>
        ))
      ) : error ? (
        <Alert variant="destructive">
          <FaExclamation className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <GroupBy groupBy={groupBy} onChangeGroupBy={setGroupBy} />
          <ScrollArea className="h-[62rem] w-auto rounded-md border dark:border-gray-50/10 border-gray-300 p-5">
            <FruitList
              fruits={fruits}
              onAddFruit={handleAddFruitToJar}
              groupBy={groupBy}
              viewType={viewType}
              setViewType={setViewType}
            />
          </ScrollArea>
        </>
      )}
    </div>
  );

  const rightContent = () => (
    <div className="text-black dark:text-white">
      <Jar setJar={setJar} fruits={jar} />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#1d1d20]">
      <Layout leftContent={leftContent()} rightContent={rightContent()} />
    </div>
  );
};

export default Home;
