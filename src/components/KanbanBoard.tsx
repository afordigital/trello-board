import { useContext, useMemo, useState } from 'react'
import { ActiveCard, Column } from '../types'
import { ColumnContainer } from './ColumnContainer'
import { createColumn } from '../utils/createColumn'
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
} from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { PlusCircle } from 'lucide-react'
import { CardContainer } from './Card/CardContainer'
import { KanbanContext } from './store/KanbanProvider'

export const KanbanBoard = () => {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeCard, setActiveCard] = useState<ActiveCard | null>(null)
  const { columns, setCards, setColumns, addColumn } = useContext(KanbanContext)
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const createNewColumn = () => {
    const columnToAdd = createColumn(columns.length + 1)
    addColumn(columnToAdd)
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
    setActiveColumn(null);
    setActiveCard(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Card";
    const isOverATask = over.data.current?.type === "Card";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((t) => t.id === activeId);
        const overIndex = cards.findIndex((t) => t.id === overId);

        if (cards[activeIndex].columnId != cards[overIndex].columnId) {
          cards[activeIndex].columnId = cards[overIndex].columnId;
          console.log(
            overIndex
          )
          return arrayMove(cards, activeIndex,  overIndex === 0 ? 0 : overIndex - 1);
        }

        return arrayMove(cards, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((t) => t.id === activeId);

        cards[activeIndex].columnId = overId;
        return arrayMove(cards, activeIndex, activeIndex);
      });
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
          >
            <div className='flex gap-x-4 h-[300px] h-fit'>
              {columns.map(column => (
                <ColumnContainer
                  key={column.id}
                  column={column}
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
              />
            )}
            {activeCard && (
              <CardContainer card={activeCard} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}
