import {Card, Column, Id} from '../types'
import { CardContainer } from './CardContainer'
import { useColumns } from './store/useColumns'
import { generateId } from '../utils/generateId'
import { useSortableConf } from '../hooks/useSortableConf'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { Trash2, GripVertical } from 'lucide-react'
import DeleteConfirmation from './DeleteConfirmation';

type Props = {
  column: Column
  deleteColumn: (id: Id) => void
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props
  const cards = useColumns(state => state.cards)  
  const cardsFromColumn = cards.filter(card => card.columnId === column.id)

  const cardIds = useMemo(() => {
    return cardsFromColumn.map(card => card.id)
  }, [cardsFromColumn])

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { editColumnTitle, addCard } = useColumns()

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf(column)

  const onInputChange = (newTitle: string) => {
    editColumnTitle(newTitle, column.id)
  }

  const addNewCard = () => {
    const newCard : Card = {
      id: generateId(),
      title: 'New card',
      description: '',
      srcImage: '',
      imageCovered: false,
      columnId: column.id
    }
    addCard(newCard, column.id)
  }


  const handleConfirmationDelete = () => {
    if(cardsFromColumn.length > 0) {
      setShowDeleteConfirmation(true)
    }else {
      handleDeleteCard()
    }
  };

  const handleDeleteCard = () => { 
    deleteColumn(column.id)
  }



  if (isDragging) {
    return (
      <div  ref={setNodeRef} style={style} className='bg-columnBackgroundColor opacity-40 border-4 border-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'></div>
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
          {cardsFromColumn.length > 0 && (
            <p className='bg-slate-7 w-[20px] h-[20px] text-sm text-center rounded-full'>
              {cardsFromColumn.length}
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
        <SortableContext items={cardIds}>
          <div className='max-h-[500px] h-[500px] overflow-y-auto space-y-4 px-1'>
            {cardsFromColumn
              .map(card => (
                <CardContainer key={card.id} card={card}  />
              ))
              .reverse()}
          </div>
        </SortableContext>
      </div>
      <DeleteConfirmation
        onSucces={handleDeleteCard}
        onCancel={()=> setShowDeleteConfirmation(false)}
        open={showDeleteConfirmation}
        title='Delete column'
        message='This column has at least one card, are you sure to delete it?'
      />
    </div>
  )
}
