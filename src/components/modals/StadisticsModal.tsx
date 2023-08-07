import React from "react";
import { Modal } from "@mantine/core";
import {
  Card,
  AreaChart,
  Title,
 
} from "@tremor/react";
import { IExpense } from "../../models/Expense";
import { format, startOfYear, endOfYear, addMonths } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  datas: IExpense[];
  buscar: string;
}

const StadisticsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  datas,
  buscar,
}) => {
  const data: IExpense[] = datas;

  const totalsByDate: Record<string, number> = {};


  const today = new Date();
  const startOfCurrentYear = startOfYear(today);
  const endOfCurrentYear = endOfYear(today);

  let currentDate = startOfCurrentYear;
  while (currentDate <= endOfCurrentYear) {
    const formattedDate = format(currentDate, "MMM yyyy"); 
    totalsByDate[formattedDate] = 0;
    currentDate = addMonths(currentDate, 1);
  }


  data
    .filter((item) => item.account?.name === buscar)
    .forEach((item) => {
      if (item.date) {
        const formattedDate = format(new Date(item.date), "MMM yyyy");
        const amount = Number(item.amount) || 0;
        totalsByDate[formattedDate] += amount;
      }
    });


  const filteredAndTransformedData = Object.entries(totalsByDate).map(
    ([date, total]) => ({
      date: date,
      [buscar]: total,
    })
  );

  const dataFormatter = (number: number) => {
    return "Bs " + Intl.NumberFormat("es-BO").format(number);
  };
  

  return (
    <Modal opened={isOpen} onClose={onClose} size="xl">
      
            <Card>
              <Title className="mt-4">Salídas mensuales (Bs)</Title>

              
                <AreaChart
                  className="h-72 mt-4"
                  data={filteredAndTransformedData}
                  index="date"
                  categories={[buscar ]}
                  colors={["cyan"]}
                  valueFormatter={dataFormatter}
                />
              
            </Card>
          
    </Modal>
  );
};

export default StadisticsModal;
