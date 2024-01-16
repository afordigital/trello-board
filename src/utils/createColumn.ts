import { generateId } from './generateId'

export const createColumn = (columnNumber: number) => {
  return {
    id: generateId(),
    title: `Column ${columnNumber}`,
    cards: []
  }
}
