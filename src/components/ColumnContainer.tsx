import { useSortable } from '@dnd-kit/sortable'
import TrashIcon from '../icons/TrashIcon'
import { Column, Id } from '../types'
import { CSS } from '@dnd-kit/utilities'
import { CardContainer } from './CardContainer'
import { useColumns } from './store/useColumns'
import { generateId } from '../utils/generateId'

type Props = {
  column: Column
  deleteColumn: (id: Id) => void
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props

  const { editColumnTitle, addCard } = useColumns()

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

  const onInputChange = (newTitle: string) => {
    editColumnTitle(newTitle, column.id)
  }

  const addNewCard = () => {
    const newCard = {
      id: generateId(),
      title: 'New card',
      description: ''
    }
    addCard(newCard, column.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='w-[350px] h-[500px] max-h-[500px] flex flex-col'
    >
      <div
        {...attributes}
        {...listeners}
        className='flex p-4 mb-4 justify-between bg-columnBackgroundColor'
      >
        <label>
          <input
            type='text'
            value={column.title}
            onChange={e => onInputChange(e.target.value)}
            className='bg-columnBackgroundColor'
          />
        </label>
        <button
          onClick={() => {
            deleteColumn(column.id)
          }}
          className='bg-columnBackgroundColor'
        >
          <TrashIcon />
        </button>
      </div>
      <div className='flex flex-grow flex-col gap-y-4'>
        <button
          onClick={() => {
            addNewCard()
          }}
          className='bg-slate-7 h-fit p-2'
        >
          Add card
        </button>
        {column.cards.map(card => (
          <CardContainer card={card} columnId={column.id} />
        ))}
      </div>
    </div>
  )
}
