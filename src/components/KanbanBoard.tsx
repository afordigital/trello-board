import { useState } from 'react'
import AddIcon from '../icons/AddIcon'
import { Column, Id } from '../types'
import { ColumnContainer } from './ColumnContainer'

type Props = {}

export const KanbanBoard = (props: Props) => {
  const [columns, setColumns] = useState<Column[]>([])

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }

  const generateId = () => {
    return Math.floor(Math.random() * 10001)
  }

  const deleteColumn = (id: Id) => {
    const filteredColumn = columns.filter(col => col.id !== id)
    setColumns(filteredColumn)
  }

  return (
    <div>
      <div className='flex gap-8'>
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
      </div>
    </div>
  )
}
