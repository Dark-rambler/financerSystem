import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable'

import { IExpense } from '../../models/Expense'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void
  lastAutoTable: {
    finalY: number
  }
}

export const generateExpenseReportPDF = (
  expenses: IExpense[],
  realTimeDate: Date
) => {
  const doc = new jsPDF('l', 'in', 'letter') as jsPDFCustom
  let totalAmount = 0

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('SALIDAS DE TECHOBOL', 4.0, 0.6)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  const accounts = [...new Set(expenses.map(expense => expense.account?.name))]

  if (accounts.length !== 0) {
    accounts.map(account => {
      const yDistance = doc.lastAutoTable.finalY
        ? doc.lastAutoTable.finalY + 0.5
        : 1
      const filteredExpenses = expenses
        .filter(expense => expense.account?.name === account)
        .sort((a, b) => {
          return (
            new Date(a.date as Date).getTime() -
            new Date(b.date as Date).getTime()
          )
        })

      const partialTotalAmount = Number(
        filteredExpenses.reduce(
          (acc, curr) => Number(acc) + Number(curr.amount),
          0
        )
      ).toFixed(2)

      totalAmount += Number(partialTotalAmount)

      doc.text(`${account?.toString()}`, 0.55, yDistance)
      doc.autoTable({
        startY: yDistance + 0.1,
        head: [
          [
            'Documento',
            'Nº Documento',
            'Fecha',
            'Sucursal',
            'Tipo salida',
            'Monto',
            'Subcuenta financiera',
            'Descripción'
          ]
        ],
        headStyles: {
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 9
        },
        body: filteredExpenses.map(expense => [
          expense.documentType,
          expense.documentNumber,
          new Date(expense.date as Date).toLocaleDateString(),
          expense.branchOffice?.name as string,
          expense.expenseType,
          `${Number(expense.amount).toFixed(2)} Bs.`,
          expense.subAccount?.name as string,
          expense.description.split('\n').join(' ')
        ]),
        foot: [['Total', '', '', '', '', `${partialTotalAmount} Bs.`]],
        footStyles: {
          fillColor: '#f3f4f6',
          textColor: '#1f2937',
          fontSize: 9
        },
        didDrawPage: () => {
          doc.setFontSize(10)
          // doc.setFont('helvetica', 'thin')
          doc.text(
            `${dayjs(realTimeDate)
              .locale('es-us')
              .format('dddd DD MMMM YYYY')}`,
            0.6,
            7.9
          )
        },
        didParseCell: data => {
          if (data.section === 'foot') {
            data.cell.styles.fontStyle = 'bold'
          }
        }
      })
    })

    doc.setFontSize(12)
    doc.text(`TOTAL:`, 3.9, doc.lastAutoTable.finalY + 0.4)
    doc.text(`${totalAmount.toFixed(2)} Bs.`, 5.5, doc.lastAutoTable.finalY + 0.4)
  }

  doc.save('informe.pdf')
}
