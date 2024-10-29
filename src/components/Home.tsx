import useFetchFruits from "./../hooks/fetchFruits";
import React from "react";
import Layout from "./Layout"; // Import the Layout component

const Home: React.FC = () => {
  const { fruits } = useFetchFruits(); // Fetch fruits data

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <Layout
        leftContent={
          <div className="text-black dark:text-white">
            {JSON.stringify(fruits)}
          </div>
        }
        rightContent={
          <div className="text-black dark:text-white">
            {/* You can add your jar or any other content here */}
            Jar content goes here.
          </div>
        }
      />
    </div>
  );
};

export default Home;
