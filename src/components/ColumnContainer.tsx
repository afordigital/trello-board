import TrashIcon from '../icons/TrashIcon'
import { Column, Id } from '../types'
import { CardContainer } from './CardContainer'
import { useColumns } from './store/useColumns'
import { generateId } from '../utils/generateId'
import { useSortableConf } from '../hooks/useSortableConf'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'

type Props = {
  column: Column
  deleteColumn: (id: Id) => void
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props
  const cardIds = useMemo(() => {
    return column.cards.map(card => card.id)
  }, [column.cards])

  const { editColumnTitle, addCard } = useColumns()

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf(column)

  if (isDragging) {
    return (
      <div className='bg-columnBackgroundColor opacity-40 border-4 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'></div>
    )
  }

  const onInputChange = (newTitle: string) => {
    editColumnTitle(newTitle, column.id)
  }

  const addNewCard = () => {
    const newCard = {
      id: generateId(),
      title: 'New card',
      description: '',
      srcImage: ''
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
        className='flex p-4 mb-4 h-[60px] flex items-center justify-between bg-columnBackgroundColor'
      >
        <label>
          <input
            type='text'
            value={column.title}
            onChange={e => onInputChange(e.target.value)}
            className='bg-columnBackgroundColor'
          />
        </label>
        {column.cards.length > 0 && (
          <p className='bg-slate-7 p-1 w-[30px] text-center rounded-full'>
            {column.cards.length}
          </p>
        )}
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
        <SortableContext items={cardIds}>
          {column.cards
            .map(card => (
              <CardContainer key={card.id} card={card} columnId={column.id} />
            ))
            .reverse()}
        </SortableContext>
      </div>
    </div>
  )
}
