import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'

interface PDFVisualizerProps {
  depositOrder: ReturnType<typeof useRegisterDepositOrder>
}

export const PDFModifier = async ({ depositOrder }: PDFVisualizerProps) => {
  const formUrl = '/documents/DEPOSIT_ORDER_DOCUMENT.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaItalicFont = await pdfDoc.embedFont( StandardFonts.HelveticaOblique)

  const financeTechical = depositOrder.employeesData.find(
    employee => employee.role.name === 'Técnico de finanzas'
  )
  const financeBoss = depositOrder.employeesData.find(
    employee => employee.role.name === 'Jefe de finanzas'
  )

  firstPage.drawText(
    `${financeTechical?.name.toUpperCase()} ${financeTechical?.lastName.toUpperCase()}`,
    {
      x: 359,
      y: height - 602,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    }
  )

  firstPage.drawText(
    `${financeBoss?.name.toUpperCase()} ${financeBoss?.lastName.toUpperCase()}`,
    {
      x: 110,
      y: height - 602,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    }
  )

  firstPage.drawText(`${depositOrder.form.values.orderDate}`, {
    x: 112,
    y: height - 162,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(
    `${depositOrder.form.values.administrator.toUpperCase()}`,
    {
      x: 155,
      y: height - 206,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    }
  )

  firstPage.drawText(`${depositOrder.form.values.regional.toUpperCase()}`, {
    x: 130,
    y: height - 184,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.orderNumber}`, {
    x: 450,
    y: height - 162,
    size: 14,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.orderRange[0]} - ${depositOrder.form.values.orderRange[1]}`, {
    x: 196,
    y: height - 272,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.amount} BS.`, {
    x: 187,
    y: height - 304,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.amount} BS.`, {
    x: 370,
    y: height - 365,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`0 BS.`, {
    x: 370,
    y: height - 400,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`0 BS.`, {
    x: 370,
    y: height - 435,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`0 BS.`, {
    x: 370,
    y: height - 470,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.limitedDate}`, {
    x: 274,
    y: height - 502,
    size: 8,
    font: helveticaItalicFont,
    color: rgb(0, 0, 0)
  })

  // const pdfBytes = await pdfDoc.save();
  // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  // const url = URL.createObjectURL(blob);
  // window.open(url);

  // const modifiedPdfBytes = await pdfDoc.save();
  // const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));
  // downloadLink.download = 'documento_modificado.pdf';
  // downloadLink.click();

  const pdfBytes = await pdfDoc.save()
  const bytes = new Uint8Array(pdfBytes)
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const docUrl = URL.createObjectURL(blob)
  depositOrder.setPdfDoc(docUrl)
}

const PDFVisualizer = ({ depositOrder }: PDFVisualizerProps) => {
  return (
    <iframe
      className='aspect-auto h-full w-full'
      title='test-frame'
      src={depositOrder.pdfDoc}
      typeof='application/pdf'
    />
  )
}

export default PDFVisualizer
