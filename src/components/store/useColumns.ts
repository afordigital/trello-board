import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Column, Id } from '../../types'

interface ColumnState {
  columns: Column[]
  setColumn: (columns: Column[]) => void
  addColumn: (column: Column) => void
  editColumnTitle: (title: string, id: Id) => void
}

export const useColumns = create<ColumnState>()(
  persist(
    set => ({
      columns: [],
      setColumn: value =>
        set({
          columns: value
        }),
      addColumn: value => set(prev => ({ columns: [...prev.columns, value] })),
      editColumnTitle: (title, id) =>
        set(prev => ({
          columns: prev.columns.map(col =>
            col.id === id ? { ...col, title } : col
          )
        }))
    }),
    {
      name: 'columns-storage'
    }
  )
)
