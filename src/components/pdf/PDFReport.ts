import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable'

import { useMoneyCollection } from '../../hooks/useMoneyCollection'
import { useExpense } from '../../hooks/useExpense'
import { useEnvelope } from '../../hooks/useEnvelope'
import { useDeposit } from '../../hooks/useDeposit'
import { useDollar } from '../../hooks/useDollar'

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void
  lastAutoTable: {
    finalY: number
  }
}

interface IGenerateReportPDF {
  moneyCollection: ReturnType<typeof useMoneyCollection>
  expense: ReturnType<typeof useExpense>
  dollar: ReturnType<typeof useDollar>
  envelope: ReturnType<typeof useEnvelope>
  deposit: ReturnType<typeof useDeposit>
}

export const generateReportPDF = ({
  moneyCollection,
  expense,
  dollar,
  envelope,
  deposit
}: IGenerateReportPDF) => {
  const doc = new jsPDF('l', 'in', 'letter') as jsPDFCustom

  doc.setFontSize(12)

  if (moneyCollection.moneyCollections.length !== 0) {
    doc.text('Recaudaciones', 0.55, 0.6)
    doc.autoTable({
      startY: 0.7,
      head: [
        [
          'Sucursal',
          'Fecha de recaudación',
          'Monto',
          'Entregado por',
          'Recibido por'
        ]
      ],
      headStyles: {
        fillColor: '#c6e0b4',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9,
        textColor: '#1f2937'
      },
      bodyStyles: {
        lineWidth: 0.01,
        lineColor: '#d4d4d8',
        fontSize: 9
      },
      body: moneyCollection.moneyCollections.map(moneyCollection => [
        moneyCollection.branchOffice?.name as string,
        new Date(moneyCollection.date as Date).toLocaleDateString(),
        `${Number(moneyCollection.amount).toFixed(2)} Bs.`,
        moneyCollection.deliveredBy as string,
        `${moneyCollection.receivedBy?.name
          .split('\n')
          .join('')} ${moneyCollection.receivedBy?.lastName
          .split('\n')
          .join('')}`
      ]),
      foot: [
        ['Total', '', `${Number(moneyCollection.totalAmount).toFixed(2)} Bs.`]
      ],
      footStyles: {
        fillColor: '#f3f4f6',
        textColor: '#1f2937',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9
      },
      theme: 'grid'
    })
  }

  if (expense.expenses.length !== 0) {
    doc.text('Salidas', 0.55, doc.lastAutoTable.finalY + 0.4)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 0.5,
      head: [
        [
          'Documento',
          'Nº Documento',
          'Fecha',
          'Sucursal',
          'Tipo salida',
          'Monto',
          'Cuenta financiera',
          'Subcuenta financiera',
          'Descripción'
        ]
      ],
      headStyles: {
        fillColor: '#fce49c',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9,
        textColor: '#1f2937'
      },
      bodyStyles: {
        lineWidth: 0.01,
        lineColor: '#d4d4d8',
        fontSize: 9
      },
      body: expense.expenses.map(expense => [
        expense.documentType,
        expense.documentNumber,
        new Date(expense.date as Date).toLocaleDateString(),
        expense.branchOffice?.name as string,
        expense.expenseType,
        `${Number(expense.amount).toFixed(2)} Bs.`,
        expense.account?.name as string,
        expense.subAccount?.name as string,
        expense.description.split('\n').join(' ')
      ]),
      foot: [
        [
          'Total',
          '',
          '',
          '',
          '',
          `${Number(expense.totalAmount).toFixed(2)} Bs.`
        ]
      ],
      footStyles: {
        fillColor: '#f3f4f6',
        textColor: '#1f2937',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9
      },
      theme: 'grid'
    })
  }

  if (dollar.dollars.length !== 0) {
    doc.text('Dólares', 0.55, doc.lastAutoTable.finalY + 0.4)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 0.5,
      head: [['Sucursal', 'Fecha', 'Monto USD', 'Monto Bs.', 'Descripción']],
      headStyles: {
        fillColor: '#fce49c',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9,
        textColor: '#1f2937'
      },
      bodyStyles: {
        lineWidth: 0.01,
        lineColor: '#d4d4d8',
        fontSize: 9
      },
      body: dollar.dollars.map(dollar => [
        dollar.branchOffice?.name as string,
        new Date(dollar.date as Date).toLocaleDateString(),
        `${Number(dollar.amount).toFixed(2)} USD.`,
        `${Number(dollar.amountBs).toFixed(2)} Bs.`,
        dollar.description.split('\n').join(' ')
      ]),
      foot: [
        ['Total', '', '', `${Number(dollar.totalAmountBs).toFixed(2)} Bs.`]
      ],
      footStyles: {
        fillColor: '#f3f4f6',
        textColor: '#1f2937',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9
      },
      theme: 'grid'
    })
  }

  if (envelope.envelopes.length !== 0) {
    doc.text('Sobres', 0.55, doc.lastAutoTable.finalY + 0.4)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 0.5,
      head: [['De Sucursal', 'A Sucursal', 'Fecha', 'Monto', 'Descripción']],
      headStyles: {
        fillColor: '#fce49c',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9,
        textColor: '#1f2937'
      },
      bodyStyles: {
        lineWidth: 0.01,
        lineColor: '#d4d4d8',
        fontSize: 9
      },
      body: envelope.envelopes.map(envelope => [
        envelope.fromBranchOffice?.name as string,
        envelope.toBranchOffice?.name as string,
        new Date(envelope.date as Date).toLocaleDateString(),
        `${Number(envelope.amount).toFixed(2)} Bs.`,
        envelope.description.split('\n').join(' ')
      ]),
      foot: [
        ['Total', '', '', `${Number(envelope.totalAmount).toFixed(2)} Bs.`]
      ],
      footStyles: {
        fillColor: '#f3f4f6',
        textColor: '#1f2937',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9
      },
      theme: 'grid'
    })
  }

  if (deposit.deposits.length !== 0) {
    doc.text('Depósitos', 0.55, doc.lastAutoTable.finalY + 0.4)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 0.5,
      head: [['Nº Voucher', 'Banco', 'Fecha', 'Monto', 'Observaciones']],
      headStyles: {
        fillColor: '#b4c6e7',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9,
        textColor: '#1f2937'
      },
      bodyStyles: {
        lineWidth: 0.01,
        lineColor: '#d4d4d8',
        fontSize: 9
      },
      body: deposit.deposits.map(deposit => [
        deposit.voucherNumber,
        deposit.bank,
        new Date(deposit.date as Date).toLocaleDateString(),
        `${Number(deposit.amount).toFixed(2)} Bs.`,
        deposit.description.split('\n').join(' ')
      ]),
      foot: [
        ['Total', '', '', `${Number(deposit.totalAmount).toFixed(2)} Bs.`]
      ],
      footStyles: {
        fillColor: '#f3f4f6',
        textColor: '#1f2937',
        lineColor: '#d4d4d8',
        lineWidth: 0.01,
        fontSize: 9
      },
      theme: 'grid'
    })
  }
  doc.setLineWidth(0.01)
  doc.line(
    4.5,
    doc.lastAutoTable.finalY + 0.7,
    6.5,
    doc.lastAutoTable.finalY + 0.7
  )

  //add a line to sign
  doc.setFontSize(10)
  doc.text(
    `${moneyCollection.depositOrder.employee?.name} ${moneyCollection.depositOrder.employee?.lastName}`,
    4.8,
    doc.lastAutoTable.finalY + 1
  )
  // doc.save('reporte.pdf')
  const file = new File([doc.output('blob')], 'reporte.pdf', {
    type: 'application/pdf'
  })

  return file
}
