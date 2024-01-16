import { useSortable } from '@dnd-kit/sortable'
import { Card, Column } from '../types'
import { CSS } from '@dnd-kit/utilities'

type SortableItem = Column | Card;

const isColumn = (item: any): item is Column => {
  return item.cards !== undefined;
}

const getSortableItemType = (item: SortableItem) => {
  return isColumn(item) ? 'Column' : 'Card';
}

export const useSortableConf = (sortableItem: SortableItem) => {
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
      type: getSortableItemType(sortableItem),
      item: sortableItem
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { isDragging, style, setNodeRef, attributes, listeners }
}
