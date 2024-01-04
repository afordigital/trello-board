import { Column, Id } from '../types'
import { CardContainer } from './CardContainer'
import { useColumns } from './store/useColumns'
import { generateId } from '../utils/generateId'
import { useSortableConf } from '../hooks/useSortableConf'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import { Trash2, GripVertical } from 'lucide-react'

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
      srcImage: '',
      imageCovered: false
    }
    addCard(newCard, column.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='w-[350px] h-[500px] max-h-[500px] flex flex-col'
    >
      <div className='flex p-4 mb-4 h-[60px] flex items-center justify-between'>
        <label className='flex items-center'>
          <div className='flex-1'>
            <input
              type='text'
              value={column.title}
              onChange={e => onInputChange(e.target.value)}
              className='bg-transparent'
            />
          </div>
        </label>
        <div className='flex gap-x-2 items-center'>
          {column.cards.length > 0 && (
            <p className='bg-slate-7 w-[20px] h-[20px] text-sm text-center rounded-full'>
              {column.cards.length}
            </p>
          )}
          <button
            onClick={() => {
              deleteColumn(column.id)
            }}
            className='bg-transparent'
          >
            <Trash2 size={'18px'} />
          </button>
          <GripVertical {...attributes} {...listeners} />
        </div>
      </div>

      <div className='flex flex-grow flex-col gap-y-4'>
        <button
          onClick={() => {
            addNewCard()
          }}
          className='bg-slate-7 rounded-[4px] h-fit p-2'
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
