import { useState, useRef, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Input } from '@mantine/core'
import { TbSearch } from 'react-icons/tb'

import { useLoginStore } from '../../components/store/loginStore'
import { IEnvelope } from '../../models/Envelope'
import { errorToast } from '../../services/toasts'

import { getAllEnvelopes } from '../../services/Envelope'
import EnvelopeAGTable from '../../components/table/techobol/AGTables/EnvelopeAGTable'

const Envelopes = () => {
  const { token } = useLoginStore()
  const [envelopeData, setEnvelopeData] = useState<IEnvelope[]>([])

  const gridRef = useRef<AgGridReact<IEnvelope>>(null)

  const getEnvelopes = async () => {
    const data = await getAllEnvelopes(token)
    if (!data) {
      errorToast('No se pudo obtener la información de los sobres')
      return
    }
    setEnvelopeData(data)
  }

  useEffect(() => {
    getEnvelopes()
  }, [])

  const onFilterTextBoxChanged = useCallback(() => {
    let value = ''
    const input = document.getElementById(
      'filter-text-box'
    ) as HTMLInputElement | null

    if (input !== null) {
      value = input.value
    }
    gridRef.current?.api.setQuickFilter(value)
  }, [])

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>SOBRES</h1>
          </div>

          <div className='flex space-x-5'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={onFilterTextBoxChanged}
            />
          </div>
        </div>

        <div className='h-[calc(100%-46px)] overflow-x-auto max-2xl:border-x-2 ' >
          <EnvelopeAGTable data={envelopeData} gridRef={gridRef} />
        </div>
      </div>
    </>
  )
}

export default Envelopes
