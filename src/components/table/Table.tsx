import { useMemo, useRef, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community'
import { DepositOrderInterface } from '../../models/DepositOrder'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'
import StatusBadge from '../badges/StatusBadge'
import RevisionStatusBadge from '../badges/RevisionStatusBadge'
import ReviewDepositOrder from '../buttons/ReviewDepositOrder'
import CancelDepositOrder from '../buttons/CancelDepositOrder'
import ViewDocument from '../buttons/ViewDocument'
import {AG_GRID_LOCALE_ES } from '../../locale/locale.es'

interface DepositOrderTableProps {
  depositOrderData: DepositOrderInterface[]
  gridRef: React.MutableRefObject<AgGridReact<DepositOrderInterface> | null>
}

const Table = ({ depositOrderData, gridRef }: DepositOrderTableProps) => {
  const [rowData, setRowData] =
    useState<DepositOrderInterface[]>(depositOrderData)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1800px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])

  useEffect(() => {
    setRowData(depositOrderData)
  }, [depositOrderData])

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'orderNumber',
      headerName: 'Nº orden',
      sortable: true,
      filter: true,
      resizable: true,
      // width: 120
    },

    {
      field: 'solitudeDate',
      valueGetter: data => {
        return dayjs(data.data.solitudeDate).locale('es-us').format('DD/MM/YY')
      },
      headerName: 'Fecha orden',
      sortable: true,
      filter: 'agDateColumnFilter',

      resizable: true,
      // width: 150,
      sort: 'desc',
      
    },
    {
      field: 'regional.name',
      headerName: 'Regional',
      sortable: true,
      filter: true,
      resizable: true,
      // width: 160
    },
    {
      field: '',
      valueGetter: data => {
        return `${data.data.employee.name} ${data.data.employee.lastName}`
      },
      headerName: 'Administrador',
      sortable: true,
      filter: true,
      resizable: true,
      width: 250
    },
    {
      valueGetter: data => {
        return `${dayjs(data.data.startDate)
          .locale('es-us')
          .format('DD/MM/YY')} - ${dayjs(data.data.endDate)
          .locale('es-us')
          .format('DD/MM/YY')}`
      },
      headerName: 'Periodo de depósito',
      sortable: true,
      filter: true,
      resizable: true,
      width: 230
    },
    {
      field: 'amount',
      valueGetter: data => {
        return Number(data.data.amount)
      },
      headerName: 'Monto Bs.',
      sortable: true,
      filter: 'agNumberColumnFilter',
      resizable: true,
      width: 160
    },
    {
      field: '',
      valueGetter: data => {
        return `${dayjs(data.data.deliveryDate)
          .locale('es-us')
          .format('DD/MM/YY')}`
      },
      headerName: 'Fecha limite',
      sortable: true,
      filter: true,
      resizable: true,
      // width: 150
    },
    {
      field: '',
      // field: 'status',
      headerName: ' Estado',
      sortable: true,
      filter: true,
      cellRenderer: StatusBadge,
      resizable: true,
      valueGetter: data => {
        return data.data.status
      },
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      // width: 130
    },
    {
      field: 'revitionStatus',
      headerName: 'Revisión',
      sortable: true,
      filter: true,
      cellRenderer: RevisionStatusBadge,
      resizable: true,
      valueGetter: data => {
        return data.data.revitionStatus
      },
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      // width: 150
    },
    {
      headerName: 'Orden',
      sortable: true,
      filter: true,
      resizable: true,
      cellRenderer: ViewDocument,
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      // width: 100
    },
    {
      headerName: 'Informe',
      sortable: true,
      filter: true,
      // width: 120
    },
    {
      // width: 100,

      resizable: false,
      // pinned: 'right',
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      cellRenderer: ReviewDepositOrder,
      maxWidth: 60
    },
    {
      maxWidth: 60,

      resizable: false,
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      // pinned: 'right',
      cellRenderer: CancelDepositOrder
    }
  ])

  // const gridRef = useRef<AgGridReact<DepositOrderInterface>>(null)

  const gridOptions = useMemo<GridOptions>(
    () => ({
      pagination: true,
      paginationPageSize: 16,
      suppressRowClickSelection: true,
      cacheQuickFilter: true,
      localeText: AG_GRID_LOCALE_ES,
      onGridSizeChanged: () => {
        gridRef.current?.api?.sizeColumnsToFit()
      },
      onGridReady: () => {
        gridRef.current?.api?.sizeColumnsToFit()
      },
      onFirstDataRendered: () => {
        gridRef.current?.api?.sizeColumnsToFit()
      },
    }),
    []
  )

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>
      </div>
    </div>
  )
}

export default Table
