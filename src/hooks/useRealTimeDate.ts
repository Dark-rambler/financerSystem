import { useState, useEffect } from "react";

export const useRealTimeDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
  }, []);

  return  currentDate ;
};