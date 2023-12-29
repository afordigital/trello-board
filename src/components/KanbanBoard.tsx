import { useMemo, useState } from 'react'
import AddIcon from '../icons/AddIcon'
import { Column, Id } from '../types'
import { ColumnContainer } from './ColumnContainer'
import { createColumn } from '../utils/createColumn'
import { filterColumn } from '../utils/filterColumn'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const createNewColumn = () => {
    const columnToAdd = createColumn(columns.length + 1)
    console.log(columnToAdd)
    setColumns([...columns, columnToAdd])
  }

  const deleteColumn = (id: Id) => {
    const filteredColumn = filterColumn(columns, id)
    setColumns(filteredColumn)
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        col => col.id === activeColumnId
      )

      const overColumnIndex = columns.findIndex(col => col.id === overColumnId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 300 // 300px
      }
    })
  )

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
          <SortableContext items={columnsId}>
            {columns.map(column => (
              <ColumnContainer column={column} deleteColumn={deleteColumn} />
            ))}
            <button
              onClick={createNewColumn}
              className='h-[60px] w-[350px] flex items-center justify-center gap-2 min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor'
            >
              <AddIcon />
              Add column
            </button>
          </SortableContext>
        </div>
      </DndContext>
    </div>
  )
}
