import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../../locale/locale.es'

import { EmployeeInterface } from '../../../models/Employee'
import DeleteButton from '../../buttons/DeleteButton'
import { useUser } from '../../../hooks/useUser'

interface UserTableProps {
  user: ReturnType<typeof useUser>
  gridRef: React.MutableRefObject<AgGridReact<EmployeeInterface> | null>
}

const UserTable = ({ user, gridRef }: UserTableProps) => {
  const [rowData, setRowData] = useState<EmployeeInterface[]>(user.users)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])

  useEffect(() => {
    setRowData(user.users)
  }, [user.users])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'name',
        headerName: 'Nombre',
        sortable: true,
        filter: false,
        resizable: true
      },
      {
        field: 'lastName',
        headerName: 'Apellidos',
        sortable: true,
        filter: false,
        resizable: true,
        sort: 'asc'
      },
      {
        field: 'email',
        headerName: 'Correo',
        sortable: true,
        filter: false,
        resizable: true
      },
      {
        field: 'role.name',
        headerName: 'Rol',
        sortable: true,
        filter: false,
        resizable: true,
        width: 270
      },
      {
        field: 'regionalOffice.name',
        headerName: 'Regional',
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Eliminar',
        resizable: false,
        width: 100,
        cellRenderer: DeleteButton,
        cellRendererParams: (params: ICellRendererParams) => ({
          onClick: () => {
            user.handlersDelete.open()
            user.setActualUserId(params.data.id)
          }
        }),
        cellStyle: {
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
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

export default UserTable
