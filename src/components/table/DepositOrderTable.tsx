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
import ViewDepositOrderReport from '../buttons/depositOrder/ViewDepositOrderReport'
import GenerateDepositOrderReport from '../buttons/depositOrder/GenerateDepositOrderReport'


import { AG_GRID_LOCALE_ES } from '../../locale/locale.es'
import { useLoginStore } from '../store/loginStore'
import { Roles } from '../../enums/Roles'

interface DepositOrderTableProps {
  depositOrderData: DepositOrderInterface[]
  gridRef: React.MutableRefObject<AgGridReact<DepositOrderInterface> | null>
}

const Table = ({
  depositOrderData,
  gridRef
}: DepositOrderTableProps) => {
  const [rowData, setRowData] =
    useState<DepositOrderInterface[]>(depositOrderData)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )

  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const { role } = useLoginStore()

  const isSalesAdministrator =
    role === Roles.SALES_MANAGER_CB ||
    role === Roles.SALES_MANAGER_LP ||
    role === Roles.SALES_MANAGER_OR ||
    role === Roles.SALES_MANAGER_SC ||
    role === Roles.SALES_MANAGER_TR

  useEffect(() => {
    setRowData(depositOrderData)
  }, [depositOrderData])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'orderNumber',
        headerName: 'Nº orden',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1
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
      },
      {
        field: 'regional.name',
        headerName: 'Regional',
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        field: '',
        valueGetter: data => {
          return `${data.data.employee.name} ${data.data.employee.lastName}`
        },
        headerName: 'Administrador',
        sortable: true,
        filter: true,
        resizable: true
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
        resizable: true
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
      },
      {
        headerName: ' Estado',
        sortable: true,
        cellRenderer: StatusBadge,
        resizable: true,
        valueGetter: data => {
          return data.data.status
        },
        cellStyle: {
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left'
        },
        filter: 'agMultiColumnFilter'
      },
      {
        field: 'revisionStatus',
        headerName: 'Revisión',
        sortable: true,
        filter: true,
        cellRenderer: RevisionStatusBadge,
        resizable: true,
        valueGetter: data => {
          return data.data.revisionStatus
        },
        cellStyle: {
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left'
        }
      },
      {
        headerName: 'Detalles',
        resizable: true,
        cellRenderer: ViewDepositOrderReport,
        cellStyle: {
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        width: 100
      },
      ...(role === Roles.FINANCIAL_MANAGER
        ? [
            {
              resizable: false,
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
          ]
        : []),
      ...(isSalesAdministrator
        ? [
            {
              maxWidth: 70,
              resizable: false,
              cellStyle: {
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              cellRenderer: GenerateDepositOrderReport
            }
          ]
        : [])
    ],
    []
  )

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
