import { useMemo, useState } from 'react'
import { ActiveCard, Card, Column, Id } from '../types'
import { ColumnContainer } from './ColumnContainer'
import { createColumn } from '../utils/createColumn'
import { filterColumn } from '../utils/filterColumn'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
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
import { CardContainer } from './CardContainer'

export const KanbanBoard = () => {
  const { columns, setCards, setColumn, addColumn } = useColumns()
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeCard, setActiveCard] = useState<ActiveCard | null>(null)
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
    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.item);
      return;
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveCard(null)
    setActiveColumn(null)
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

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { current } = active.data;
    const currentCard = current?.item as ActiveCard | undefined;

    if (!over || !currentCard) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Card";
    const isOverATask = over.data.current?.type === "Card";
    const currentOverCard = over.data.current?.item as ActiveCard | undefined;

    if (!isActiveATask) return;


    if (isActiveATask && isOverATask) {
      const selectedColumn = columns.find((col) => col.id === currentCard.columnId);
      if (!selectedColumn) return;

      const tasks = selectedColumn.cards;
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      const isOverACardInSameColumn = currentCard.columnId === currentOverCard?.columnId;

      if (isOverACardInSameColumn) {
        setCards(arrayMove(tasks, activeIndex, overIndex), selectedColumn.id)
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10 // 10px
      }
    })
  )

  return (
    <div
      className='mx-auto flex flex-1 w-full items-center overflow-x-auto px-[40px]'>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className='mx-auto flex'>
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
            {activeCard && (
              <CardContainer card={activeCard} columnId={activeCard.columnId} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}
