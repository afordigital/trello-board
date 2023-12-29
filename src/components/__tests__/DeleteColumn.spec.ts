import { describe, expect, it } from 'vitest'

import { filterColumn } from '../../utils/filterColumn'

describe('delete one column in our array of columns', () => {
  it.each([
    {
      columns: [
        { id: 1, title: 'Column 1' },
        { id: 2, title: 'Column 2' }
      ],
      idToDelete: 2,
      expectedFilteredColumns: [{ id: 1, title: 'Column 1' }]
    },
    {
      columns: [
        { id: 1, title: 'Column 1' },
        { id: 2, title: 'Column 2' }
      ],
      idToDelete: 3,
      expectedFilteredColumns: [
        { id: 1, title: 'Column 1' },
        { id: 2, title: 'Column 2' }
      ]
    },
    {
      columns: [
        { id: 1, title: 'Column 1' },
        { id: 2, title: 'Column 2' },
        { id: 2, title: 'Column 2' },
        { id: 3, title: 'Column 3' }
      ],
      idToDelete: 2,
      expectedFilteredColumns: [
        { id: 1, title: 'Column 1' },
        { id: 3, title: 'Column 3' }
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
