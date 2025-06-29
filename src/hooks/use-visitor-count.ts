import { useEffect, useState } from "react";

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);

        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay

        // Generate a realistic visitor count (between 15,000 and 25,000)
        const baseCount = 15000;
        const randomExtra = Math.floor(Math.random() * 10000);
        const mockCount = baseCount + randomExtra;

        setCount(mockCount);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();

    // Update count every 30 seconds with small incremental changes
    const interval = setInterval(() => {
      setCount((prevCount) => {
        // Small random increase (0-5 new visitors)
        const increment = Math.floor(Math.random() * 6);
        return prevCount + increment;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    formattedCount: count.toLocaleString(),
    loading,
    error,
  };
}
