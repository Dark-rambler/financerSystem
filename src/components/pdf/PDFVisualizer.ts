import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'

interface PDFVisualizerProps {
  depositOrder: ReturnType<typeof useRegisterDepositOrder>
}

export const PDFModifier = async ({ depositOrder }: PDFVisualizerProps) => {
  
  const formUrl = '/documents/DEPOSIT_ORDER_DOCUMENT.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { height } = firstPage.getSize()
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaItalicFont = await pdfDoc.embedFont(
    StandardFonts.HelveticaOblique
  )
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const financeTechical = depositOrder.employeesData.find(
    employee => employee.role?.name === 'Técnico de finanzas'
  )
  const financeBoss = depositOrder.employeesData.find(
    employee => employee.role?.name === 'Jefe de finanzas'
  )

  firstPage.drawText(`${financeTechical?.name.toUpperCase()} ${financeTechical?.lastName.toUpperCase()}`, {
    x: 355,
    y: height - 635,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${financeBoss?.name.toUpperCase()} ${financeBoss?.lastName.toUpperCase()}`, {
    x: 127,
    y: height - 635,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(
    `${dayjs(depositOrder.form.values.orderDate)
      .locale('es-us')
      .format('DD MMMM YYYY').toUpperCase()}`,
    {
      x: 117,
      y: height - 162,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    }
  )

  firstPage.drawText(`${depositOrder.form.values.administrator.toUpperCase()}`, {
    x: 159,
    y: height - 206,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.regional.toUpperCase()}`, {
    x: 139,
    y: height - 184,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.form.values.orderNumber.toUpperCase()}`, {
    x: 450,
    y: height - 162,
    size: 14,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(
    `${dayjs(depositOrder.form.values.orderRange[0])
      .locale('es-us')
      .format('DD MMMM YYYY').toUpperCase()} - ${dayjs(depositOrder.form.values.orderRange[1])
      .locale('es-us')
      .format('DD MMMM YYYY').toUpperCase()}`,
    {
      x: 200,
      y: height - 273,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    }
  )

  depositOrder.branchOfficesAndAmounts.map((branchOffice, index) => {
    firstPage.drawRectangle({
      x: 191,
      y: height - 340 - index * 25,
      width: 229,
      height: 22,
      borderWidth: 0.5,
      borderColor: rgb(0, 0, 0),
      // opacity: 0.5,
      borderOpacity: 1
    })

    firstPage.drawText(`${branchOffice.branchOffice.label.toUpperCase()}`, {
      x: 204,
      y: height - 332 - index * 25,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })
    firstPage.drawText(`${branchOffice.amount.toFixed(2)} BS.`, {
      x: 345,
      y: height - 332 - index * 25,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })
  })

  firstPage.drawRectangle({
    x: 191,
    y: height - 340 - depositOrder.branchOfficesAndAmounts.length * 25,
    width: 229,
    height: 22,
    borderWidth: 0.5,
    borderColor: rgb(0, 0, 0),
    // opacity: 0.5,
    borderOpacity: 1
  })

  firstPage.drawText(`TOTAL A DEPOSITAR: `, {
    x: 204,
    y: height - 332 - depositOrder.branchOfficesAndAmounts.length * 25,
    size: 10,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(`${depositOrder.totalAmount.toFixed(2)} BS.`, {
    x: 345,
    y: height - 332 - depositOrder.branchOfficesAndAmounts.length * 25,
    size: 10,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0)
  })

  firstPage.drawText(
    `Fecha límite de entrega: ${dayjs(depositOrder.form.values.limitedDate)
      .locale('es-us')
      .format('DD MMMM YYYY')}`,
    {
      x: 195,
      y: height - 332 - (depositOrder.branchOfficesAndAmounts.length + 1) * 25,
      size: 9,
      font: helveticaItalicFont,
      color: rgb(0, 0, 0)
    }
  )
  //save document as File and store it in a variable in orden to be able to send it to the aws s3 bucket
  const pdfBytes = await pdfDoc.save()
  const pdfFile = new File([pdfBytes], 'DEPOSIT_ORDER_DOCUMENT.pdf', {
    type: 'application/pdf'
  })
  // const docUrl = URL.createObjectURL(pdfFile)

  depositOrder.setPdfFile(() => pdfFile)


  // const pdfBytes = await pdfDoc.save()
  // const bytes = new Uint8Array(pdfBytes)
  // const blob = new Blob([bytes], { type: 'application/pdf' })
  // const docUrl = URL.createObjectURL(blob)

  // depositOrder.setPdfDoc(docUrl)
  // depositOrder.setIsDocumentGenerated(true)
}

