import { Card, Column, Id } from '../types'
import { CardContainer } from './Card/CardContainer'
import { generateId } from '../utils/generateId'
import { useSortableConf } from '../hooks/useSortableConf'
import { SortableContext } from '@dnd-kit/sortable'
import { useContext, useMemo, useState } from 'react'
import { Trash2, GripVertical } from 'lucide-react'
import DeleteConfirmation from './DeleteConfirmation';
import { filterColumn } from '../utils/filterColumn'
import { KanbanContext } from './store/KanbanProvider'

type Props = {
  column: Column
}

export const ColumnContainer = (props: Props) => {
  const { column } = props
  const {  cards, setColumns, addCard, editColumnTitle } = useContext(KanbanContext)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf({
      type: 'Column',
      item: column
    })

  const filteredCards = useMemo(() => cards.filter(card => card.columnId === column.id), [cards, column.id])

  const onInputChange = (newTitle: string) => {
    editColumnTitle(newTitle, column.id)
  }

  const addNewCard = () => {
    const newCard: Card = {
      id: generateId(),
      title: 'New card',
      description: '',
      srcImage: '',
      imageCovered: true,
      columnId: column.id
    }
    addCard(newCard)
  }

  const handleConfirmationDelete = () => {
    if (cards.length > 0) {
      setShowDeleteConfirmation(true)
    } else {
      handleDeleteCard()
    }
  };

  const deleteColumn = (id: Id) => {
    setColumns((prev) => filterColumn(prev, id))
  }

  const handleDeleteCard = () => {
    deleteColumn(column.id)
  }


  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='bg-columnBackgroundColor opacity-40 border-4 border-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='w-[350px] h-fit flex flex-col text-white'
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
          {cards.length > 0 && (
            <p className='bg-slate-7 w-[20px] h-[20px] text-sm text-center rounded-full'>
              {cards.length}
            </p>
          )}
          <button
            onClick={handleConfirmationDelete}
            className='bg-transparent'
          >
            <Trash2 size={'18px'} />
          </button>
          <GripVertical {...attributes} {...listeners} />
        </div>
      </div>

      <div className='flex flex-col gap-y-4'>
        <button
          onClick={() => {
            addNewCard()
          }}
          className='bg-slate-7 rounded-[4px] h-fit p-2'
        >
          Add card
        </button>
        <SortableContext items={filteredCards.map((el) => el.id)}>
          <div className='max-h-[500px] h-[500px] overflow-y-auto flex flex-col gap-3 px-1'>
            {filteredCards
              .map(card => (
                <CardContainer key={card.id} card={card} />
              ))
            }
          </div>
        </SortableContext>
      </div>
      <DeleteConfirmation
        onSucces={handleDeleteCard}
        onCancel={() => setShowDeleteConfirmation(false)}
        open={showDeleteConfirmation}
        title='Delete column'
        message='This column has at least one card, are you sure to delete it?'
      />
    </div>
  )
}
