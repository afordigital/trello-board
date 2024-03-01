import { useSortable } from '@dnd-kit/sortable'
import { Card, Column } from '../types'
import { CSS } from '@dnd-kit/utilities'

type SortableItem = Column | Card;
type SortableItemType = 'Column' | 'Card';

interface SortableConf {
  type: SortableItemType;
  item: SortableItem;
}

export const useSortableConf = ({type, item}:SortableConf) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    
  } = useSortable({
    id: item.id,
    data: {
      type,
      item: item
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { isDragging, style, setNodeRef, attributes, listeners }
}
