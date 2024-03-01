import { describe, expect, it } from 'vitest'

import { filterColumn } from '../../utils/filterColumn'
import {Column} from "../../types";

const column1 : Column = { id: 1, title: 'Column 1' }
const column2 : Column = { id: 2, title: 'Column 2' }
const column3 : Column = { id: 3, title: 'Column 3' }

describe('delete one column in our array of columns', () => {
  it.each([
    {
      columns: [column1, column2],
      idToDelete: 2,
      expectedFilteredColumns: [column1]
    },
    {
      columns: [column1, column2],
      idToDelete: 3,
      expectedFilteredColumns: [column1, column2]
    },
    {
      columns: [column1, column2, column2, column3],
      idToDelete: 2,
      expectedFilteredColumns: [column1, column3]
    },
    {
      columns: [],
      idToDelete: 2,
      expectedFilteredColumns: []
    },
    {
      columns: [
        { id: '42e8906a-4277-4845-a83d-e0b861858775', title: 'Column 1' },
        { id: 'b34872d7-af57-4e5c-9be1-25cc56a46ac8', title: 'Column 2' }
      ],
      idToDelete: 'b34872d7-af57-4e5c-9be1-25cc56a46ac8',
      expectedFilteredColumns: [
        { id: '42e8906a-4277-4845-a83d-e0b861858775', title: 'Column 1' },
      ]
    }
  ])(
    'filterColumn("$columns, $idToDelete") -> $expectedFilteredColumns',
    ({ columns, idToDelete, expectedFilteredColumns }) => {
      expect(filterColumn(columns, idToDelete)).toStrictEqual(
        expectedFilteredColumns
      )
    }
  )
})
