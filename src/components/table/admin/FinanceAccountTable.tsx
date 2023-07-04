


import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../../locale/locale.es'

import { IAccount } from '../../../models/Account'
import DeleteButton from '../../buttons/DeleteButton'
import { useAccount } from '../../../hooks/useAccount'

interface AccountTableProps {
  account: ReturnType<typeof useAccount>
  gridRef: React.MutableRefObject<AgGridReact<IAccount> | null>
}

const FinanceAccountTable = ({ account, gridRef }: AccountTableProps) => {
  const [rowData, setRowData] = useState<IAccount[]>(account.accounts)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])

  useEffect(() => {
    setRowData(account.accounts)
  }, [account.accounts])

  const columnDefs = useMemo<ColDef[]>(() => ([
    {
      field: 'name',
      headerName: 'Cuenta financiera',
      sortable: true,
      filter: false,
      resizable: true
    },
    {
      headerName: 'Eliminar',
      resizable: false,
      width: 100,
      cellRenderer: DeleteButton,
      cellRendererParams: (params: ICellRendererParams )  => ({
        onClick: () => {
          account.handlersDelete.open()
          account.setActualAccountId(params.data.id)
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

export default FinanceAccountTable
