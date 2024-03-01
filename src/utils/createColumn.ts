import { generateId } from './generateId'
import {Column} from "../types";

export const createColumn = (columnNumber: number) : Column => {
  return {
    id: generateId(),
    title: `Column ${columnNumber}`,
  }
}
