import { useSortable } from '@dnd-kit/sortable'
import { Column } from '../types'
import { CSS } from '@dnd-kit/utilities'

export const useSortableConf = (column: Column) => {
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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { isDragging, style, setNodeRef, attributes, listeners }
}
