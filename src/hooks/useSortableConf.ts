import { useSortable } from '@dnd-kit/sortable'
import { Card, Column } from '../types'
import { CSS } from '@dnd-kit/utilities'

type SortableItem = Column | Card;

export const useSortableConf = (sortableItem: SortableItem) => {
  if(!sortableItem) throw new Error('You must pass a column or card to useSortableConf hook')
  
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: sortableItem?.id ?? '',
    data: {
      type: sortableItem?.type ?? '',
      item: sortableItem
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { isDragging, style, setNodeRef, attributes, listeners }
}
