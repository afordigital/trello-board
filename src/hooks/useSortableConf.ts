import { useSortable } from '@dnd-kit/sortable'
import { Card, Column } from '../types'
import { CSS } from '@dnd-kit/utilities'

export const useSortableConf = (column?: Column, card?: Card) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column ? column.id : card!.id,
    data: {
      type: column ? 'Column' : 'Card',
      item: column ? column : card
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { isDragging, style, setNodeRef, attributes, listeners }
}
