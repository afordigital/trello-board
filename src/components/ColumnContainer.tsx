import TrashIcon from '../icons/TrashIcon'
import { Column, Id } from '../types'

type Props = {
  column: Column
  deleteColumn: (id: Id) => void
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props
  return (
    <div className='flex justify-between bg-columnBackgroundColor w-[200px] h-[300px] p-4'>
      {column.title}
      <button
        onClick={() => {
          deleteColumn(column.id)
        }}
        className='h-fit bg-columnBackgroundColor'
      >
        <TrashIcon />
      </button>
    </div>
  )
}
