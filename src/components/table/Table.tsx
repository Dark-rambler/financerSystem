import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  showNavigation?: boolean
}

export const Table = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: [
        {
          id: 'orderNumber',
          desc: false
        }
      ]
    },
    onSortingChange: setSorting
  })

  return (
    <div className='border-gray-300 border rounded-md h-[calc(100%-70px)]'>
      <table className='w-full text-left rounded-3xl'>
        <thead className=''>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className='px-6 py-4 text-sm font-semibold text-gray-600 border-b border-b-gray-300 bg-gray-50 rounded-xl'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='border-b border-b-gray-200'>
              {row.getVisibleCells().map(cell => (
                <td
                  className='whitespace-nowrap px-6 py-2.5 text-[13.2px] font-normal text-gray-900'
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
