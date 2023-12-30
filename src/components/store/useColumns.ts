import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Card, Column, Id } from '../../types'

interface ColumnState {
  columns: Column[]
  setColumn: (columns: Column[]) => void
  addColumn: (column: Column) => void
  editColumnTitle: (title: string, id: Id) => void
  addCard: (card: Card, id: Id) => void
  editCardDescription: (
    newDescription: string,
    cardId: Id,
    columnId: Id
  ) => void
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
        })),
      addCard: (card, id) =>
        set(state => ({
          columns: state.columns.map(column => {
            if (column.id === id) {
              return { ...column, cards: [...column.cards, card] }
            }
            return column
          })
        })),
      editCardDescription: (newDescription, cardId, columnId) =>
        set(prev => ({
          columns: prev.columns.map(column => {
            if (column.id === columnId) {
              return {
                ...column,
                cards: column.cards.map(card => {
                  if (card.id === cardId) {
                    return { ...card, description: newDescription }
                  }
                  return card
                })
              }
            }
            return column
          })
        }))
    }),
    {
      name: 'columns-storage'
    }
  )
)
