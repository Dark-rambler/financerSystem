import { Modal } from '@mantine/core';
import {Card, AreaChart, Title} from '@tremor/react'
import { IExpense } from '../../models/Expense'
import { format } from 'date-fns';

/*interface DataItem {
 * label: string;
  value: number;
}*/

/*interface DataItem {
  date: string;
  value: number;
  name: string;
  account: string;
  */
  // Otras propiedades si las hay
//}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  datas: IExpense[];
  buscar:string
}

const StadisticsModal: React.FC<ModalProps> = ({ isOpen, onClose, datas, buscar }) => {
  const data: IExpense[] = datas
  console.log(datas)
  const filteredAndTransformedData = data
  .filter(item => item.account?.name === buscar) 
  .map(item => {
    if (item.date) {
      return {
        date: format(new Date(item.date), 'dd/MM/yyyy'),
        Salidas: item.amount,
      };
    }
    return null;
  })
  .filter(Boolean);

console.log(filteredAndTransformedData);

  const dataFormatter = (number: number) => {
    return "Bs " + Intl.NumberFormat("Bs").format(number).toString();
  };
  return (
    <Modal opened={isOpen} onClose={onClose} size="xl">
      <Card>
        <Title>Salídas mensuales (Bs)</Title>
        <AreaChart
          className="h-72 mt-4"
          data={filteredAndTransformedData}
          index="date"
          categories={["Salidas"]}
          colors={["cyan",'blue','yellow' ]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </Modal>
  );
};

export default StadisticsModal;
