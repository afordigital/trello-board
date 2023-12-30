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
