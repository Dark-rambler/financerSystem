import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../../locale/locale.es'

import { IBranchModel } from '../../../models/BranchOffice'
import DeleteButton from '../../buttons/DeleteButton'
import { useBranchOffice } from '../../../hooks/useBranchOffice'

interface BranchOfficeTableProps {
  branchOffice: ReturnType<typeof useBranchOffice>
  gridRef: React.MutableRefObject<AgGridReact<IBranchModel> | null>
}

const BranchOfficeTable = ({ branchOffice, gridRef }: BranchOfficeTableProps) => {
  const [rowData, setRowData] = useState<IBranchModel[]>(branchOffice.branchOffices)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])

  useEffect(() => {
    setRowData(branchOffice.branchOffices)
  }, [branchOffice.branchOffices])

  const columnDefs = useMemo<ColDef[]>(() => ([
    {
      field: 'name',
      headerName: 'Nombre',
      sortable: true,
      filter: false,
      resizable: true
    },
    {
      field: 'address',
      headerName: 'Dirección',
      sortable: true,
      filter: false,
      resizable: true
    },
    {
      field: 'regionalOffice.name',
      headerName: 'Regional',
      sortable: true,
      resizable: true,
      sort: 'asc',
    },
    {
      headerName: 'Eliminar',
      resizable: false,
      width: 100,
      cellRenderer: DeleteButton,
      cellRendererParams: (params: ICellRendererParams )  => ({
        onClick: () => {
          branchOffice.handlersDelete.open()
          branchOffice.setActualBranchOfficeId(params.data.id)
        }
      }),
      cellStyle: {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  ]), [])



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

export default BranchOfficeTable
