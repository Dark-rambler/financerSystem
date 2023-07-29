import { useState, useEffect } from "react";

export const useRealTimeDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://worldtimeapi.org/api/ip')
      .then((response) => response.json())
      .then((data) => {
        const dateObject = new Date(data.datetime);
        setCurrentDate(dateObject);
      })
      .catch((error) => {
        console.error('Error al obtener la fecha desde internet:', error);
        setCurrentDate(new Date());
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { currentDate, isLoading };
};