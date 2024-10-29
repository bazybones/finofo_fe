import useFetchFruits from "./../hooks/fetchFruits";
import React, { useState } from "react";
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
  const [jar, setJar] = useState<Fruit[]>([]);

  const handleAddFruitToJar = (fruit: Fruit) => {
    setJar((prevJar) => [...prevJar, fruit]);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#1d1d20]">
      <Layout
        leftContent={
          <div className="text-black dark:text-white">
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="gap-4">
                  <Skeleton className="h-16 w-auto mb-2" key={index} />
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
                <ScrollArea className="h-[62rem] w-auto rounded-md border p-5">
                  <FruitList
                    fruits={fruits}
                    onAddFruit={handleAddFruitToJar}
                    groupBy={groupBy}
                  />
                </ScrollArea>
              </>
            )}
          </div>
        }
        rightContent={
          <div className="text-black dark:text-white">
            <Jar setJar={setJar} fruits={jar} />
          </div>
        }
      />
    </div>
  );
};

export default Home;
