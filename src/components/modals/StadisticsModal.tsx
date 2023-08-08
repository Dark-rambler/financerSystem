import React from 'react'
import { Modal } from '@mantine/core'
import {
  Grid,
  Card,
  AreaChart,
  Text,
  Metric,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  DonutChart,
  Col
} from '@tremor/react'
import { IExpense } from '../../models/Expense'
import { format, startOfYear, endOfYear, addMonths } from 'date-fns'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  datas: IExpense[]
  buscar: string
}

const StadisticsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  datas,
  buscar
}) => {
  const data: IExpense[] = datas

  const totalsByDate: Record<string, number> = {}

  const today = new Date()
  const startOfCurrentYear = startOfYear(today)
  const endOfCurrentYear = endOfYear(today)

  let currentDate = startOfCurrentYear
  while (currentDate <= endOfCurrentYear) {
    const formattedDate = format(currentDate, 'MMM yyyy')
    totalsByDate[formattedDate] = 0
    currentDate = addMonths(currentDate, 1)
  }

  data
    .filter(item => item.account?.name === buscar)
    .forEach(item => {
      if (item.date) {
        const formattedDate = format(new Date(item.date), 'MMM yyyy')
        const amount = Number(item.amount) || 0
        totalsByDate[formattedDate] += amount
      }
    })

  const filteredAndTransformedData = Object.entries(totalsByDate).map(
    ([date, total]) => ({
      date: date,
      [buscar]: total
    })
  )

  const dataFormatter = (number: number) => {
    return 'Bs ' + Intl.NumberFormat('es-BO').format(number)
  }

  return (
    <Modal opened={isOpen} onClose={onClose} size='80%'>
      <Card color='white'>
        <TabGroup>
          <TabList className='mt-8'>
            <Tab>Salídas mensuales (Bs)</Tab>
            <Tab>Distribucion de salidas (Bs)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AreaChart
                className='h-72 mt-4'
                data={filteredAndTransformedData}
                index='date'
                categories={[buscar]}
                colors={['cyan']}
                valueFormatter={dataFormatter}
              />
            </TabPanel>
            <TabPanel>
              <Grid numItemsSm={2}>
                <Col>
                  <Grid numItemsSm={2} className='gap-1'>
                    {filteredAndTransformedData.map(item => (
                      <Col>
                        <Card
                          className='max-w-xs mx-auto'
                          decoration='bottom'
                          decorationColor='cyan'
                        >
                          <Text>{item.date}</Text>
                          <Metric>{item[buscar]} Bs.</Metric>
                        </Card>
                      </Col>
                    ))}
                  </Grid>
                </Col>

                <Col>
                  <Grid>
                    <Col className='pt-44'>
                      <DonutChart
                        className='h-72 mt-4'
                        data={filteredAndTransformedData}
                        index='date'
                        category={buscar}
                        colors={[
                          'blue',
                          'cyan',
                          'teal',
                          'green',
                          'lime',
                          'yellow',
                          'orange',
                          'cyan',
                          'pink',
                          'purple',
                          'violet',
                          'indigo'
                        ]}
                        valueFormatter={dataFormatter}
                      />
                    </Col>
                  </Grid>
                </Col>
              </Grid>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </Modal>
  )
}

export default StadisticsModal
