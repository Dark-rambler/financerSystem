import { PDFDocument } from 'pdf-lib'
import { useEffect } from 'react'
import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'



interface PDFVisualizerProps {
    depositOrder: ReturnType<typeof useRegisterDepositOrder>
}

export const PDFModifier = async ({depositOrder}: PDFVisualizerProps
) => {
    const formUrl = '/documents/DEPOSIT_ORDER_DOCUMENT.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()

    const financialOfficer = form.getTextField('Jefe_finanzas')
    const technicalOfficer = form.getTextField('Tecnico_finanzas')
    const orderDate = form.getTextField('Date')
    const regional = form.getTextField('Regional')
    const administrator = form.getTextField('Administrator')
    const orderNumber = form.getTextField('Order_Number')
    const amount = form.getTextField('Amount')
    const orderRange = form.getTextField('Order_range')
    const limitedDate = form.getTextField('Limited_Date')

    const bill = form.getTextField('Bill')
    const dolar = form.getTextField('Dolar')
    const receipt = form.getTextField('Receipt')
    const envelope = form.getTextField('Envelope')

    bill.setText('0 BS.')
    dolar.setText('0 BS.')
    receipt.setText('0 BS.')
    envelope.setText('0 BS.')

    financialOfficer.setText(``)
    technicalOfficer.setText(`technicalOfficerValue`)
    orderDate.setText(`${depositOrder.form.values.orderDate}`)
    regional.setText(`${depositOrder.form.values.regional}`)
    administrator.setText(`${depositOrder.form.values.administrator}`)
    orderNumber.setText(`${depositOrder.form.values.orderNumber}`)
    amount.setText(`${depositOrder.form.values.amount} BS.`)
    orderRange.setText(`${depositOrder.form.values.orderRange[0]} ${depositOrder.form.values.orderRange[1]}`)
    limitedDate.setText(`${depositOrder.form.values.limitedDate}`)


    // form.removeField(financialOfficer)

form.removeField(financialOfficer)
form.removeField(technicalOfficer)
form.removeField(orderDate)
form.removeField(regional)
form.removeField(administrator)
form.removeField(orderNumber)
form.removeField(amount)
form.removeField(orderRange)
form.removeField(limitedDate)
    

    const pdfBytes = await pdfDoc.save()
    const bytes = new Uint8Array(pdfBytes)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const docUrl = URL.createObjectURL(blob)
    depositOrder.setPdfDoc(docUrl)
  }

const PDFVisualizer = ({depositOrder}:PDFVisualizerProps ) => {
  return (
          <iframe
            className='aspect-auto h-full w-full'
            //delete toolbar
        
            title='test-frame'
            src={depositOrder.pdfDoc}
            typeof='application/pdf'
          />
  )
}

export default PDFVisualizer
