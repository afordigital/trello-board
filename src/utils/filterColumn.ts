import { Column, Id } from '../types'

export const filterColumn = (columns: Column[], id: Id) => {
  return columns.filter(col => col.id !== id)
}
