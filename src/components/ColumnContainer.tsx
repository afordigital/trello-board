import { useSortable } from '@dnd-kit/sortable'
import TrashIcon from '../icons/TrashIcon'
import { Column, Id } from '../types'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  column: Column
  deleteColumn: (id: Id) => void
}

const PATO = '🦆'
const CARBUNS = 'carbuns'

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  })

  if (isDragging) {
    return (
      <div className='bg-columnBackgroundColor opacity-40 border-4 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'></div>
    )
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'
    >
      <div {...attributes} {...listeners} className='h-[50px]'>
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
      <p>Container</p>
      <p>Footer</p>
    </div>
  )
}
