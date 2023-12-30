import { generateId } from './generateId'

export const createColumn = (length: number) => {
  return {
    id: generateId(),
    title: `Column ${length}`,
    cards: []
  }
}
