import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, GridOptions } from 'ag-grid-community'
import { DepositOrderInterface } from '../../models/DepositOrder'
import StatusBadge from '../badges/StatusBadge'
import RevisionStatusBadge from '../badges/RevisionStatusBadge'
import ReviewDepositOrder from '../buttons/depositOrder/ReviewDepositOrder'
import CancelDepositOrder from '../buttons/depositOrder/CancelDepositOrder'
import ViewDocument from '../buttons/depositOrder/ViewDocument'
import { AG_GRID_LOCALE_ES } from '../../locale/locale.es'

interface DepositOrderTableProps {
  depositOrderData: DepositOrderInterface[]
  gridRef: React.MutableRefObject<AgGridReact<DepositOrderInterface> | null>
}

const Table = ({ depositOrderData, gridRef }: DepositOrderTableProps) => {
  const [rowData, setRowData] =
    useState<DepositOrderInterface[]>(depositOrderData)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
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
      flex: 1
      // width: 120
    },

    {
      field: 'solitudeDate',
      valueGetter: data => {
        return new Date(data.data.solitudeDate)
      },
      valueFormatter: params => {
        return `${params.value.toLocaleDateString('es-ES')}`
      },
      headerName: 'Fecha orden',
      sortable: true,
      filter: 'agDateColumnFilter',

      resizable: true
      // width: 150,
      // sort: 'desc'
    },
    {
      field: 'regional.name',
      headerName: 'Regional',
      sortable: true,
      filter: true,
      resizable: true,
 
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

      // width: 200

    },
    {
      valueGetter: data => {
        return new Date(data.data.startDate)
      },
      valueFormatter: params => {
        return `${params.value.toLocaleDateString('es-ES')}`
      },
      headerName: 'Fecha inicio',
      sortable: true,
      filter: 'agDateColumnFilter',
      resizable: true
    },
    {
      valueGetter: data => {
        return new Date(data.data.endDate)
      },
      valueFormatter: params => {
        return `${params.value.toLocaleDateString('es-ES')}`
      },
      headerName: 'Fecha fin',
      sortable: true,
      filter: 'agDateColumnFilter',
      resizable: true
    },
    {
      field: 'amount',
      valueGetter: data => {
        return Number(data.data.amount)
      },
      valueFormatter: params => {
        return `${params.value.toFixed(2)} Bs`
      },
      headerName: 'Monto Bs.',
      sortable: true,
      filter: 'agNumberColumnFilter',
      resizable: true,

    },
    {
      field: '',
      valueGetter: data => {
        return new Date(data.data.deliveryDate)
      },
      valueFormatter: params => {
        return `${params.value.toLocaleDateString('es-ES')}`
      },
      headerName: 'Fecha limite',
      sortable: true,
      filter: 'agDateColumnFilter',
      resizable: true
      // width: 150
    },
    {
      field: '',
      // field: 'status',
      headerName: ' Estado',
      sortable: true,
      // filter: true,
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
      filter: 'agMultiColumnFilter'
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
      }
      // width: 170
    },
    {
      headerName: 'Orden',
      resizable: true,
      cellRenderer: ViewDocument,
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },  
      width: 80
    },
    {
      headerName: 'Informe',
 
      resizable: true,
      width: 100
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
 
      maxWidth: 70
    },
    {
 
      maxWidth: 70,
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
      paginationAutoPageSize: true,
      suppressRowClickSelection: true,
      cacheQuickFilter: true,
      localeText: AG_GRID_LOCALE_ES,

      onGridSizeChanged: params => {
        params.api.sizeColumnsToFit()
      },
      onFirstDataRendered: params => {
        params.api.sizeColumnsToFit()
        }
  
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
