import { describe, expect, it } from 'vitest'

import { filterColumn } from '../../utils/filterColumn'

describe('delete one column in our array of columns', () => {
  it.each([
    {
      columns: [
        { id: 1, title: 'Column 1', cards: [] },
        { id: 2, title: 'Column 2', cards: [] }
      ],
      idToDelete: 2,
      expectedFilteredColumns: [{ id: 1, title: 'Column 1', cards: [] }]
    },
    {
      columns: [
        { id: 1, title: 'Column 1', cards: [] },
        { id: 2, title: 'Column 2', cards: [] }
      ],
      idToDelete: 3,
      expectedFilteredColumns: [
        { id: 1, title: 'Column 1', cards: [] },
        { id: 2, title: 'Column 2', cards: [] }
      ]
    },
    {
      columns: [
        { id: 1, title: 'Column 1', cards: [] },
        { id: 2, title: 'Column 2', cards: [] },
        { id: 2, title: 'Column 2', cards: [] },
        { id: 3, title: 'Column 3', cards: [] }
      ],
      idToDelete: 2,
      expectedFilteredColumns: [
        { id: 1, title: 'Column 1', cards: [] },
        { id: 3, title: 'Column 3', cards: [] }
      ]
    },
    {
      columns: [],
      idToDelete: 2,
      expectedFilteredColumns: []
    },
    {
      columns: [
        { id: '42e8906a-4277-4845-a83d-e0b861858775', title: 'Column 1', cards: [] },
        { id: 'b34872d7-af57-4e5c-9be1-25cc56a46ac8', title: 'Column 2', cards: [] }
      ],
      idToDelete: 'b34872d7-af57-4e5c-9be1-25cc56a46ac8',
      expectedFilteredColumns: [
        { id: '42e8906a-4277-4845-a83d-e0b861858775', title: 'Column 1', cards: [] },
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
