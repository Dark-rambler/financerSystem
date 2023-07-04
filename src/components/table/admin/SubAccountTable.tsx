import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../../locale/locale.es'

import { ISubAccount } from '../../../models/SubAccount'
import DeleteButton from '../../buttons/DeleteButton'
import { useSubAccount } from '../../../hooks/useSubAccount'

interface SubAccountTableProps {
  subAccount: ReturnType<typeof useSubAccount>
  gridRef: React.MutableRefObject<AgGridReact<ISubAccount> | null>
}

const SubAccountTable = ({ subAccount, gridRef }: SubAccountTableProps) => {
  const [rowData, setRowData] = useState<ISubAccount[]>(subAccount.subAccounts)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])

  useEffect(() => {
    setRowData(subAccount.subAccounts)
  }, [subAccount.subAccounts])

  const columnDefs = useMemo<ColDef[]>(() => ([
    {
      field: 'name',
      headerName: 'Subcuenta financiera',
      sortable: true,
      filter: false,
      resizable: true
    },
    {
      field: 'account.name',
      headerName: 'Cuenta financiera',
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
          subAccount.handlersDelete.open()
          subAccount.setActualSubAccountId(params.data.id)
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

export default SubAccountTable
