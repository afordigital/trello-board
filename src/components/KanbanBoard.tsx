import { useMemo, useState } from 'react'
import { Column, Id } from '../types'
import { ColumnContainer } from './ColumnContainer'
import { createColumn } from '../utils/createColumn'
import { filterColumn } from '../utils/filterColumn'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useColumns } from './store/useColumns'
import { createPortal } from 'react-dom'
import { PlusCircle } from 'lucide-react'

export const KanbanBoard = () => {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const { columns, setColumn, addColumn } = useColumns()
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const createNewColumn = () => {
    const columnToAdd = createColumn(columns.length + 1)
    console.log(columnToAdd)
    addColumn(columnToAdd)
  }

  const deleteColumn = (id: Id) => {
    const filteredColumn = filterColumn(columns, id)
    setColumn(filteredColumn)
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.item)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    const activeColumnIndex = columns.findIndex(
      (col: Column) => col.id === activeColumnId
    )

    const overColumnIndex = columns.findIndex(
      (col: Column) => col.id === overColumnId
    )

    setColumn(arrayMove(columns, activeColumnIndex, overColumnIndex))
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10 // 10px
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
        <div className='m-auto flex min-h-screen w-full mt-8 overflow-x-auto overflow-y-hidden px-[40px]'>
          <div className='flex'>
            <SortableContext
              items={columnsId}
              strategy={horizontalListSortingStrategy}
            >
              <div className='flex gap-x-4 h-[300px] h-fit'>
                {columns.map(column => (
                  <ColumnContainer
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                  />
                ))}
              </div>
              <button
                onClick={createNewColumn}
                className='h-[60px] w-[350px] flex items-center justify-center gap-2 min-w-[350px] cursor-pointer ml-4 rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor'
              >
                <PlusCircle />
                Add column
              </button>
            </SortableContext>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
    </div>
  )
}
