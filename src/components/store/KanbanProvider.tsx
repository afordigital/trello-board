import React, { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { Card, Column, Id } from "../../types";

interface State {
  columns: Column[]
  cards: Card[]
  setColumns: Dispatch<SetStateAction<Column[]>>
  setCards: Dispatch<SetStateAction<Card[]>>
  addColumn: (column: Column) => void
  editColumnTitle: (title: string, id: Id) => void
  addCard: (card: Card) => void
  deleteCard: (cardId: Id) => void
  addCardImage: (newImage: string, cardId: Id) => void
  editCardTitle: (newTitle: string, cardId: Id) => void
  editCardDescription: (newDescription: string, cardId: Id) => void
  editCardIsCover: (newState: boolean, cardId: Id) => void

}

const getStorage = () => {
  const storage = localStorage.getItem('kanban')
  if (storage) {
    const { columns, cards } = JSON.parse(storage)
    return { columns, cards }
  }
  return { columns: [], cards: [] }
}

export const KanbanContext = React.createContext<State>({
  columns: [],
  cards: [],
  setColumns: () => { },
  setCards: () => { },
  addColumn: () => { },
  editColumnTitle: () => { },
  addCard: () => { },
  deleteCard: () => { },
  addCardImage: () => { },
  editCardTitle: () => { },
  editCardDescription: () => { },
  editCardIsCover: () => { },
})



export const KanbanProvider = ({ children }: PropsWithChildren) => {

  const [columns, setColumns] = useState<Column[]>(getStorage().columns)
  const [cards, setCards] = useState<Card[]>(getStorage().cards)

  const addColumn = (column: Column) => setColumns(prev => [...prev, column])
  const editColumnTitle = (title: string, id: Id) => setColumns(prev => prev.map(col => col.id === id ? { ...col, title } : col))
  const addCard = (card: Card) => setCards(prev => [card, ...prev,])
  const deleteCard = (cardId: Id) => setCards(prev => prev.filter(card => card.id !== cardId))
  const addCardImage = (newImage: string, cardId: Id) => setCards(prev => prev.map(card => card.id === cardId ? { ...card, srcImage: newImage } : card))
  const editCardTitle = (newTitle: string, cardId: Id) => setCards(prev => prev.map(card => card.id === cardId ? { ...card, title: newTitle } : card))
  const editCardDescription = (newDescription: string, cardId: Id) => setCards(prev => prev.map(card => card.id === cardId ? { ...card, description: newDescription } : card))
  const editCardIsCover = (newState: boolean, cardId: Id) => setCards(prev => prev.map(card => card.id === cardId ? { ...card, imageCovered: newState } : card))

  useEffect(() => {
    const storage = {
      columns,
      cards
    }
    localStorage.setItem('kanban', JSON.stringify(storage))
  }, [columns, cards])

  return (
    <KanbanContext.Provider value={{
      columns, cards, setColumns, setCards,
      addColumn, editColumnTitle, addCard, deleteCard, addCardImage, editCardTitle, editCardDescription, editCardIsCover
    }}>
      {children}
    </KanbanContext.Provider>
  )
}