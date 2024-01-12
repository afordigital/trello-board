import { useSortable } from '@dnd-kit/sortable'
import { ActiveCard, Card, Column } from '../types'
import { CSS } from '@dnd-kit/utilities'

export const useSortableConf = (column?: Column, card?: ActiveCard) => {
  if(!column && !card) throw new Error('You must pass a column or card to useSortableConf hook')
  
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column?.id ?? card?.id ?? '',
    data: {
      type: column ? 'Column' : 'Card',
      item: column ?? card ?? null
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { isDragging, style, setNodeRef, attributes, listeners }
}
