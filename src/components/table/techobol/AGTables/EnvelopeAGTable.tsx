import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, GridOptions, NumberFilter } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../../../locale/locale.es'

import { IEnvelope } from '../../../../models/Envelope'

interface EnvelopeProps {
  data: IEnvelope[]
  gridRef: React.MutableRefObject<AgGridReact<IEnvelope> | null>
}

const EnvelopeAGTable = ({ data, gridRef }: EnvelopeProps) => {
  const [rowData, setRowData] = useState<IEnvelope[]>(data)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])

  useEffect(() => {
    setRowData(data)
  }, [data])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'depositOrder.orderNumber',
        headerName: 'Orden de depósito',
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        field: 'fromBranchOffice.name',
        headerName: 'De Sucursal',
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        field: 'toBranchOffice.name',
        headerName: 'A Sucursal',
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        headerName: 'Fecha',
        valueGetter: data => {
          return new Date(data.data.date)
        },
        valueFormatter: params => {
          return `${params.value.toLocaleDateString('es-ES')}`
        },
        sortable: true,
        filter: 'agDateColumnFilter',
        resizable: true
      },
      {
        field: 'amount',
        headerName: 'Monto',
        valueFormatter: params => {
          return `${Number(params.data.amount).toFixed(2)} Bs.`
        },
        sortable: true,
        filter: NumberFilter,
        resizable: true
      },
      {
        field: 'description',
        headerName: 'Descripción',
        sortable: true,
        filter: true,
        resizable: true,
        width: 300
      }
    ],
    []
  )

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

export default EnvelopeAGTable
