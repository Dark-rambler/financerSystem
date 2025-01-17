import { useMemo, useState, useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {
  ColDef,
  GridOptions,
  NumberFilter,
  GridApi
} from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../../../locale/locale.es'

import { IExpense } from '../../../../models/Expense'

interface ExpenseProps {
  data: IExpense[]
  gridRef: React.MutableRefObject<AgGridReact<IExpense> | null>
  filteredExpenseData: React.MutableRefObject<IExpense[] | undefined>
}

const ExpenseAGTable = ({
  data,
  gridRef,
  filteredExpenseData
}: ExpenseProps) => {
  const [rowData, setRowData] = useState<IExpense[]>(data)
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', minWidth: '1500px' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [totalMonto, setTotalMonto] = useState<number>(0)
  const totalMontoRef = useRef<number>(0)

  useEffect(() => {
    setRowData(data)
  }, [data])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'depositOrder.orderNumber',
        headerName: 'Orden de depósito',
        sortable: true,
        comparator: (idA: string, idB: string) =>
          parseInt(idA.split('-')[1]) - parseInt(idB.split('-')[1]),
        filter: true,
        resizable: true
      },
      {
        field: 'documentType',
        headerName: 'Documento',
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        field: 'documentNumber',
        headerName: 'Nº documento',
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
        field: 'branchOffice.name',
        headerName: 'Sucursal',
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        field: 'expenseType',
        headerName: 'Tipo de salida',
        sortable: true,
        filter: true,
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
        field: 'account.name',
        headerName: 'Cuenta financiera',
        valueGetter: params => {
          return `${params.data.account?.name}`
        },
        sortable: true,
        resizable: true
      },
      {
        field: 'subAccount.name',
        headerName: 'Subcuenta financiera',
        valueGetter: params => {
          return `${params.data.subAccount?.name}`
        },
        sortable: true,
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

  const onGridReady = (params: { api: GridApi }) => {
    setGridApi(params.api)
  }

  useEffect(() => {
    if (gridApi) {
      const updateFilteredData = () => {
        const filteredData: IExpense[] = []
        gridApi.forEachNodeAfterFilter(node => {
          filteredData.push(node.data)
        })
        filteredExpenseData.current = filteredData

        const totalMonto = filteredData.reduce(
          (total, row) => total + Number(row.amount || 0),
          0
        )
        setTotalMonto(totalMonto)
        totalMontoRef.current = totalMonto
      }

      updateFilteredData()

      gridApi.addEventListener('filterChanged', updateFilteredData)

      return () => {
        if (gridApi) {
          gridApi.removeEventListener('filterChanged', updateFilteredData)
        }
      }
    }
  }, [gridApi, data, filteredExpenseData])

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
      },
      onFilterChanged: params => {
        const filteredData: IExpense[] = []
        params.api.forEachNodeAfterFilter(node => {
          filteredData.push(node.data)
        })
        filteredExpenseData.current = filteredData
        // const filterModel = params.api.getFilterModel()
      }
    }),
    []
  )

  return (
    <div style={containerStyle}>
      <div style={{ height: '90%', boxSizing: 'border-box' }}>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
          ></AgGridReact>
          <div
            style={{
              textAlign: 'right',
              padding: '1rem',
              paddingRight: '2rem',
              border: '1px solid #BABFC7',
              borderTop: 'none'
            }}
          >
            Total Salida: {totalMonto.toFixed(2)} Bs.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseAGTable
