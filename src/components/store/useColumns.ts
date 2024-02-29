import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {  Card, Column, Id } from '../../types'


interface ColumnState {
  columns: Column[]
  cards: Card[]
  setColumn: (columns: Column[]) => void
  addColumn: (column: Column) => void
  editColumnTitle: (title: string, id: Id) => void
  addCard: (card: Card, id: Id) => void
  setCards: (cards: Card[], id: Id) => void
  deleteCard: (cardId: Id) => void
  addCardImage: (newImg: string, cardId: Id) => void
  editCardTitle: (newTitle: string, cardId: Id) => void
  editCardDescription: (
    newDescription: string,
    cardId: Id,
  ) => void
  editCardIsCover: (newState: boolean, cardId: Id) => void
}

export const useColumns = create<ColumnState>()(
  persist(
    set => ({
      columns: [],
      cards: [],
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
      addCard: (card) =>
        set(state => ({
         cards: [...state.cards, card],
        })),
      setCards: (cards) =>
        set(state => ({
          cards: cards
        })),
      deleteCard: (cardId) =>
        set(prev => ({
         cards: prev.cards.filter(card => card.id !== cardId)
        })),
      addCardImage: (newImage, cardId) =>
        set(prev => ({
          cards: prev.cards.map(card => {
            if (card.id === cardId) {
              return {
                ...card,
                srcImage: newImage
              }
            }
            return card
          })
        })),
      editCardTitle: (newTitle, cardId) =>
        set(prev => ({
          cards: prev.cards.map(card => {
            if (card.id === cardId) {
              return {
                ...card,
                title: newTitle
              }
            }
            return card
        })
        })),
      editCardDescription: (newDescription, cardId) =>
        set(prev => ({

          cards: prev.cards.map(card => {
            if (card.id === cardId) {
              return {
                ...card,
                description: newDescription
              }
            }
            return card
          })
        })),
      editCardIsCover: (newState, cardId) =>
        set(prev => ({
          cards: prev.cards.map(card => {
            if (card.id === cardId) {
              return {
                ...card,
                imageCovered: newState
              }
            }
            return card
          })
        }))
    }),
    {
      name: 'columns-storage'
    }
  )
)
