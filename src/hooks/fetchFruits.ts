import { useState, useEffect } from "react";
import axios from "axios";
import { Fruit } from "./../types/Fruit";

const useFetchFruits = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get("/api");
        setFruits(response.data);
      } catch (err) {
        setError("Failed to load fruits data");
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  return { fruits, loading, error };
};

export default useFetchFruits;
